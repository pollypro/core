import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';

export default class PublishService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: Record<string, any>, { serviceId }: { serviceId: string }) {
    await ServicesRepository.updateById(serviceId, {
      published: true,
      publishedAt: new Date(),
    });
    return context;
  }
}
