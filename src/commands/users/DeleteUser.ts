import { UsersRepository } from '../../repositories';
import CurrentUser from './CurrentUser';
import FindUserById from './FindUserById';

export default class DeleteUser {
  public static readonly dependsOn = [CurrentUser, FindUserById];

  async execute(context: Record<string, any>, { id }: { id: string }) {
    await UsersRepository.deleteById(id);
    return context;
  }
}
