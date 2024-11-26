import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { mapQuestion } from './mappers/questions';
import { QuestionSchema } from './schemas/question';

type NewQuestionDocument = {
  question: string;
  testId: string | ObjectId;
};

type PatchQuestionDocument = {
  question?: string;
};

export default class QuestionsRepository {
  static readonly collectionName = 'questions';

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<QuestionSchema>(QuestionsRepository.collectionName);
  }

  static async insertOne(document: NewQuestionDocument) {
    const collection = await QuestionsRepository.getCollection();

    try {
      const result = await collection.insertOne({
        ...document,
        testId: new ObjectId(document.testId),
        createdAt: new Date(),
      });
      return mapQuestion(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async findById(id: string) {
    const collection = await QuestionsRepository.getCollection();

    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return mapQuestion(result);
    } catch (e) {
      throw e;
    }
  }

  static async updateById(id: string, patch: PatchQuestionDocument) {
    const collection = await QuestionsRepository.getCollection();

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

  static async list({ query }: { query?: Partial<QuestionSchema> } = { query: {} }) {
    const collection = await QuestionsRepository.getCollection();

    try {
      const result = await collection.find(query).toArray();
      return result.map(mapQuestion);
    } catch (e) {
      throw e;
    }
  }

  static async deleteById(id: string) {
    const collection = await QuestionsRepository.getCollection();

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    if (await collectionExists(QuestionsRepository.collectionName)) {
      const collection = await QuestionsRepository.getCollection();
      await collection.drop();
    }
  }
}
