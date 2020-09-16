import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';

export default class ListServices {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const services = await ServicesRepository.list({ params });
    return { ...context, services };
  }
}
