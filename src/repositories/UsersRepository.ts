import { getConnection } from '../utils/mongodb';
import { IUser } from '../types/user';

export default class UsersRepository {

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection('users');
  }

  static async insertOne(document: IUser) {
    const collection = await UsersRepository.getCollection();

    return await collection
      .insertOne(document);
  }

  static async drop() {
    const collection = await UsersRepository.getCollection();

    return await collection.drop();
  }

}
