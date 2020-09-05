import { compare } from 'bcrypt';
import { getConnection } from '../utils/mongodb';
import { UserSchema } from './schemas/User';
import { DocumentNotFound } from './errors';
import { mapUser } from './mappers/users';

export type NewUserDocument = {
  firstName: string;
  lastName: string;
  companyId?: string;
  permissions: string[];
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
      const result = await collection.insertOne(document);
      return mapUser(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async findByEmail(email: string, opts: { throw: boolean } = { throw: true }) {
    const collection = await UsersRepository.getCollection();
    const user = await collection.findOne({ email });

    if (!user && opts.throw) {
      throw new DocumentNotFound();
    }

    return mapUser(user);
  }

  static async drop() {
    const collection = await UsersRepository.getCollection();

    return await collection.drop();
  }
}
