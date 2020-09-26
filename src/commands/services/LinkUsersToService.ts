import { ObjectId } from 'mongodb';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';

const uniqIds = (ids: string[]): ObjectId[] =>
  ids.filter((id, i) => ids.indexOf(id) === i).map((id) => new ObjectId(id));

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
      users: uniqIds([...context.service.users, ...users]),
      companies: uniqIds([...context.service.companies, ...companies]),
    });

    return context;
  }
}
