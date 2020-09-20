import { ObjectId } from 'mongodb';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';

export default class LinkUsersToService {
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
      users: [...context.service.users, ...users].map((id) => new ObjectId(id)),
      companies: [...context.service.companies, ...companies].map(
        (id) => new ObjectId(id),
      ),
    });

    return context;
  }
}
