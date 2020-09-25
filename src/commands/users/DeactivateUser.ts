import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindUserById from './FindUserById';

export default class DeactivateUser {
  public static readonly dependsOn = [CurrentUser, FindUserById];

  async execute(context: Record<string, any>, { userId }: { userId: string }) {
    await UsersRepository.updateById(userId, { status: 'inactive' });
    return context;
  }
}
