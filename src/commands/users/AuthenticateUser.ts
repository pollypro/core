import Unauthorized from '../../errors/Unauthorized';
import { IUser } from '../../types/user';
import UsersRepository from '../../repositories/UsersRepository';

export default class AuthenticateUser {
  async execute(context: { user: IUser }, params: { email: string; password: string }) {
    const user = await UsersRepository.authenticate(params.email, params.password);

    if (!user) {
      throw new Unauthorized();
    }

    return { ...context, user };
  }
}
