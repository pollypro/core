import { ObjectId } from 'mongodb';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';

export default class UnlinkUsersFromService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(
    context: { service: ServiceObject },
    {
      serviceId,
      users = [],
      companies = [],
    }: { serviceId: string; users: string[]; companies: string[] },
  ) {
    await ServicesRepository.updateById(serviceId, {
      users: context.service.users
        .filter((id) => !users.includes(id))
        .map((id) => new ObjectId(id)),
      companies: context.service.companies
        .filter((id) => !companies.includes(id))
        .map((id) => new ObjectId(id)),
    });

    return context;
  }
}
