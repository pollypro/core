import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';

export default class UpdateService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(
    context: Record<string, any>,
    { id, service }: { id: string; service: { name?: string } },
  ) {
    await ServicesRepository.updateById(id, service);
    return context;
  }
}
