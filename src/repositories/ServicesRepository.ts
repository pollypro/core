import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { mapService } from './mappers/services';
import { ServiceSchema } from './schemas/service';
import { getMongoPagination, PaginationParams } from './utils/pagination';

type NewServiceDocument = {
  name: string;
  companies?: (string | ObjectId)[];
  users?: (string | ObjectId)[];
};

type PatchServiceDocument = {
  name?: string;
  published?: boolean;
  publishedAt?: Date;
};

export default class ServicesRepository {
  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<ServiceSchema>('services');
  }

  static async insertOne(document: NewServiceDocument) {
    const collection = await ServicesRepository.getCollection();

    try {
      const result = await collection.insertOne({
        published: false,
        ...document,
        companies: (document.companies || []).map((id) => new ObjectId(id)),
        users: (document.users || []).map((id) => new ObjectId(id)),
        createdAt: new Date(),
      });
      return mapService(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async findById(id: string) {
    const collection = await ServicesRepository.getCollection();

    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return mapService(result);
    } catch (e) {
      throw e;
    }
  }

  static async deleteById(id: string) {
    const collection = await ServicesRepository.getCollection();

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      throw e;
    }
  }

  static async updateById(id: string, patch: PatchServiceDocument) {
    const collection = await ServicesRepository.getCollection();

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

  static async list({ params }: { params: PaginationParams } = { params: {} }) {
    const collection = await ServicesRepository.getCollection();
    const pagination = getMongoPagination(params);

    try {
      const result = await collection
        .find()
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .toArray();
      return result.map(mapService);
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
