import { getConnection } from '../utils/mongodb';
import { ICompany } from '../types/company';

export default class CompaniesRepository {

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection('companies');
  }

  static async insertOne(document: ICompany) {
    const collection = await CompaniesRepository.getCollection();

    try {
      const result = await collection.insertOne(document);
      return result.ops[0];
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    const collection = await CompaniesRepository.getCollection();

    return await collection.drop();
  }

}
