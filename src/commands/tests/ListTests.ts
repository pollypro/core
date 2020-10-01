import { ObjectId } from 'mongodb';
import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';
import { UserObject } from '../../repositories/mappers/users';

type Context = {
  currentUser: UserObject;
};

export default class ListTests {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Context,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const { query } = await ListTests.checkPermissions(context);

    const tests = await TestsRepository.list({ query, params });
    return { ...context, tests };
  }

  static async checkPermissions(context: Context) {
    if (!context.currentUser.isAdmin) {
      return { query: { users: new ObjectId(context.currentUser.id) } };
    }

    return { query: {} };
  }
}
