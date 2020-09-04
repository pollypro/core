import { getConnection } from '../utils/mongodb';
import { UserSchema } from './schemas/User';
import { IUser } from '../types/user';
import { DocumentNotFound } from './errors';

export default class UsersRepository {
  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<UserSchema>('users');
  }

  static async insertOne(document: IUser) {
    const collection = await UsersRepository.getCollection();

    try {
      const result = await collection.insertOne(document);
      return result.ops[0];
    } catch (e) {
      throw e;
    }
  }

  static async findByEmail(email: string) {
    const collection = await UsersRepository.getCollection();
    const user = await collection.findOne({ email });

    if (!user) {
      throw new DocumentNotFound();
    }

    return user;
  }

  static async drop() {
    const collection = await UsersRepository.getCollection();

    return await collection.drop();
  }
}
