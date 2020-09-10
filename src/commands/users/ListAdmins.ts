import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';

export default class ListAdmins {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const admins = await UsersRepository.listAdmins({ params });
    return { ...context, admins };
  }
}
