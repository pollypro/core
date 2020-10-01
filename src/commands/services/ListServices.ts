import { ObjectId } from 'mongodb';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';
import { UserObject } from '../../repositories/mappers/users';

type Context = {
  currentUser: UserObject;
};

export default class ListServices {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Context,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const { query } = await ListServices.checkPermissions(context);

    const services = await ServicesRepository.list({ query, params });
    return { ...context, services };
  }

  static async checkPermissions(context: Context) {
    if (!context.currentUser.isAdmin) {
      return { query: { users: new ObjectId(context.currentUser.id) } };
    }

    return { query: {} };
  }
}
