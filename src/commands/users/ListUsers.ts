import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';

export default class ListUsers {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const users = await UsersRepository.list({ query: { isAdmin: false }, params });
    return { ...context, users };
  }
}
