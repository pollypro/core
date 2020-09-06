import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { mapCompany } from './mappers/companies';
import { CompanySchema } from './schemas/company';
import { PaginationParams, getMongoPagination } from './utils/pagination';

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
      const result = await collection.insertOne({ ...document, createdAt: new Date() });
      return mapCompany(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async findById(id: string) {
    const collection = await CompaniesRepository.getCollection();

    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return mapCompany(result);
    } catch (e) {
      throw e;
    }
  }

  static async deleteById(id: string) {
    const collection = await CompaniesRepository.getCollection();

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      throw e;
    }
  }

  static async list({ params }: { params: PaginationParams } = { params: {} }) {
    const collection = await CompaniesRepository.getCollection();
    const pagination = getMongoPagination(params);

    try {
      const result = await collection
        .find()
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .toArray();
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
