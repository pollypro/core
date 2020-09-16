import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { mapQuestion } from './mappers/questions';
import { QuestionSchema } from './schemas/question';

type NewQuestionDocument = {
  question: string;
  serviceId: string | ObjectId;
};

export default class ServicesRepository {
  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<QuestionSchema>('questions');
  }

  static async insertOne(document: NewQuestionDocument) {
    const collection = await ServicesRepository.getCollection();

    try {
      const result = await collection.insertOne({
        ...document,
        serviceId: new ObjectId(document.serviceId),
        createdAt: new Date(),
      });
      return mapQuestion(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    if (await collectionExists('services')) {
      const collection = await ServicesRepository.getCollection();
      await collection.drop();
    }
  }
}
