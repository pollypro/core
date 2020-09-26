import { ObjectId } from 'mongodb';
import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';

export default class ListLinkedUsers {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: { service: ServiceObject }) {
    const linkedUsers = await UsersRepository.list({
      query: { _id: { $in: context.service.users.map((id) => new ObjectId(id)) } },
      params: { perPage: 500 },
    });

    return { ...context, linkedUsers };
  }
}
