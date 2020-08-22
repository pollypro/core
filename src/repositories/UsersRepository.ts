import { getConnection } from '../utils/mongodb';

interface User {
  firstName: string;
  lastName: string;
  company: string;
  permissions: string[];
  phone: string;
  email: string;
  password: string;
  status: 'activated' | 'deactivated';
}

export default class UsersRepository {

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection('users');
  }

  static async insertOne(document: User) {
    const collection = await UsersRepository.getCollection();

    return await collection
      .insertOne(document);
  }

  static async drop() {
    const collection = await UsersRepository.getCollection();

    return await collection.drop();
  }

}
