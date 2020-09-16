import { UsersRepository } from '../../repositories';
import CurrentUser from './CurrentUser';
import FindUserById from './FindUserById';

export default class UpdateUser {
  public static readonly dependsOn = [CurrentUser, FindUserById];

  async execute(
    context: Record<string, any>,
    {
      userId,
      user,
    }: { userId: string; user: { firstName?: string; lastName?: string; phone?: string } },
  ) {
    await UsersRepository.updateById(userId, user);
    return context;
  }
}
