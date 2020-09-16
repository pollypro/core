import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';

export default class UpdateService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(
    context: Record<string, any>,
    { serviceId, service }: { serviceId: string; service: { name?: string } },
  ) {
    await ServicesRepository.updateById(serviceId, service);
    return context;
  }
}
