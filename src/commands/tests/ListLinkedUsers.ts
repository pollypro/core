import { ObjectId } from 'mongodb';
import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';
import { TestObject } from '../../repositories/mappers/tests';

export default class ListLinkedUsers {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: { test: TestObject }) {
    const linkedUsers = await UsersRepository.list({
      query: { _id: { $in: context.test.users.map((id) => new ObjectId(id)) } },
      params: { perPage: 500 },
    });

    return { ...context, linkedUsers };
  }
}
