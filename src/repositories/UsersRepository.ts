import { ObjectId } from 'mongodb';
import { compare } from 'bcrypt';
import { getConnection, collectionExists } from '../utils/mongodb';
import { UserSchema } from './schemas/User';
import { mapUser } from './mappers/users';

export type NewUserDocument = {
  firstName: string;
  lastName: string;
  companyId?: ObjectId;
  isAdmin?: boolean;
  phone: string;
  email: string;
  password: string;
  status: string;
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
      const result = await collection.insertOne({ ...document, createdAt: new Date() });
      return mapUser(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    if (await collectionExists('users')) {
      const collection = await UsersRepository.getCollection();
      await collection.drop();
    }
  }
}
