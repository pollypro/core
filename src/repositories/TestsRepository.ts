import { ObjectId, FilterQuery } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { mapTest } from './mappers/tests';
import { TestSchema } from './schemas/Test';
import { getMongoPagination, PaginationParams } from './utils/pagination';

type NewTestDocument = {
  name: string;
  users?: ObjectId[];
};

type PatchTestDocument = {
  name?: string;
  users?: ObjectId[];
  published?: boolean;
  publishedAt?: Date;
};

export default class TestsRepository {
  static readonly collectionName = 'tests';

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<TestSchema>('tests');
  }

  static async insertOne(document: NewTestDocument) {
    const collection = await TestsRepository.getCollection();

    try {
      const result = await collection.insertOne({
        published: false,
        ...document,
        createdAt: new Date(),
      });
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

  static async deleteById(id: string) {
    const collection = await TestsRepository.getCollection();

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
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

  static async list(
    { query, params }: { query?: FilterQuery<TestSchema>; params?: PaginationParams } = {
      query: {},
      params: {},
    },
  ) {
    const collection = await TestsRepository.getCollection();
    const pagination = getMongoPagination(params);

    try {
      const result = await collection
        .find(query)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .toArray();
      return result.map(mapTest);
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    if (await collectionExists(TestsRepository.collectionName)) {
      const collection = await TestsRepository.getCollection();
      await collection.drop();
    }
  }
}
