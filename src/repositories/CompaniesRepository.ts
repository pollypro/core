import { getConnection } from '../utils/mongodb';
import { ICompany } from '../types/company';

export default class CompaniesRepository {

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection('companies');
  }

  static async insertOne(document: ICompany) {
    const collection = await CompaniesRepository.getCollection();

    return await collection
      .insertOne(document);
  }

  static async drop() {
    const collection = await CompaniesRepository.getCollection();

    return await collection.drop();
  }

}
