import { getConnection } from '../utils/mongodb';
import { ICompany, CompanySchema } from '../types/company';
import { mapCompany } from '../mappers/companies';

export default class CompaniesRepository {

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<CompanySchema>('companies');
  }

  static async insertOne(document: ICompany) {
    const collection = await CompaniesRepository.getCollection();

    try {
      const result = await collection.insertOne(document);
      return mapCompany(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async list() {
    const collection = await CompaniesRepository.getCollection();

    try {
      const result = await collection.find().toArray();
      return result.map(mapCompany);
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    const collection = await CompaniesRepository.getCollection();

    return await collection.drop();
  }

}
