import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { mapTest } from './mappers/tests';
import { TestSchema } from './schemas/test';

type NewTestDocument = {
  name: string;
};

type PatchTestDocument = {
  name: string;
};

export default class TestsRepository {
  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<TestSchema>('tests');
  }

  static async insertOne(document: NewTestDocument) {
    const collection = await TestsRepository.getCollection();

    try {
      const result = await collection.insertOne({ ...document, createdAt: new Date() });
      return mapTest(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async findById(id: string) {
    const collection = await TestsRepository.getCollection();

    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return mapTest(result);
    } catch (e) {
      throw e;
    }
  }

  static async updateById(id: string, patch: PatchTestDocument) {
    const collection = await TestsRepository.getCollection();

    try {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...patch, updatedAt: new Date() } },
      );
      // TODO: handle result.modifiedCount === 0;
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    if (await collectionExists('tests')) {
      const collection = await TestsRepository.getCollection();
      await collection.drop();
    }
  }
}
