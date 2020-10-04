import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindUserById from './FindUserById';
import { UserStatus } from '../../constants/users';

export default class ActivateUser {
  public static readonly dependsOn = [CurrentUser, FindUserById];

  async execute(context: Record<string, any>, { userId }: { userId: string }) {
    await UsersRepository.updateById(userId, { status: UserStatus.Active });
    return context;
  }
}
