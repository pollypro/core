import { getConnection, collectionExists } from '../utils/mongodb';
import { mapCompany } from './mappers/companies';
import { CompanySchema } from './schemas/company';

type NewCompanyDocument = {
  name: string;
};

export default class CompaniesRepository {
  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<CompanySchema>('companies');
  }

  static async insertOne(document: NewCompanyDocument) {
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
    if (await collectionExists('companies')) {
      const collection = await CompaniesRepository.getCollection();
      await collection.drop();
    }
  }
}
