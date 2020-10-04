import { ObjectId, FilterQuery } from 'mongodb';
import { compare } from 'bcrypt';
import { getConnection, collectionExists } from '../utils/mongodb';
import { UserSchema } from './schemas/User';
import { mapUser } from './mappers/users';
import { getMongoPagination, PaginationParams } from './utils/pagination';
import { UserStatus } from '../constants/users';

export type NewUserDocument = {
  firstName: string;
  lastName: string;
  companyId?: string | ObjectId;
  isAdmin?: boolean;
  phone: string;
  email: string;
  password: string;
  status: UserStatus;
};

export type PatchUserDocument = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: UserStatus;
};

export default class UsersRepository {
  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<UserSchema>('users');
  }

  static async authenticate(email: string, password: string) {
    const collection = await UsersRepository.getCollection();
    const user = await collection.findOne({ email });
    const match = await compare(password, user?.password);
    return match ? mapUser(user) : null;
  }

  static async insertOne(document: NewUserDocument) {
    const collection = await UsersRepository.getCollection();

    try {
      const result = await collection.insertOne({
        status: UserStatus.Inactive,
        ...document,
        companyId: document.companyId ? new ObjectId(document.companyId) : null,
        createdAt: new Date(),
      });
      return mapUser(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async findById(id: string) {
    const collection = await UsersRepository.getCollection();

    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return mapUser(result);
    } catch (e) {
      throw e;
    }
  }

  static async updateById(id: string, patch: PatchUserDocument) {
    const collection = await UsersRepository.getCollection();

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

  static async deleteById(id: string) {
    const collection = await UsersRepository.getCollection();

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      throw e;
    }
  }

  static async list(
    { query, params }: { query?: FilterQuery<UserSchema>; params?: PaginationParams } = {
      query: {},
      params: {},
    },
  ) {
    const collection = await UsersRepository.getCollection();
    const pagination = getMongoPagination(params);

    try {
      const result = await collection
        .find(query)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .toArray();
      return result.map(mapUser);
    } catch (e) {
      throw e;
    }
  }

  static async searchByFirstLastName(
    {
      query,
      params,
    }: {
      query: string;
      params?: PaginationParams;
    } = { query: '', params: {} },
  ) {
    const collection = await UsersRepository.getCollection();
    const pagination = getMongoPagination(params);

    const regexQuery = `.*${query}.*`;

    try {
      const result = await collection
        .find({
          isAdmin: false,
          $or: [
            { firstName: { $regex: regexQuery, $options: 'i' } },
            { lastName: { $regex: regexQuery, $options: 'i' } },
          ],
        })
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .toArray();
      return result.map(mapUser);
    } catch (e) {
      throw e;
    }
  }

  static async listAdmins(
    { query, params }: { query?: Partial<UserSchema>; params?: PaginationParams } = {
      query: {},
      params: {},
    },
  ) {
    return await UsersRepository.list({ query: { ...query, isAdmin: true }, params });
  }

  static async drop() {
    if (await collectionExists('users')) {
      const collection = await UsersRepository.getCollection();
      await collection.drop();
    }
  }
}
