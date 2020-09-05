import Unauthorized from '../../errors/Unauthorized';
import UsersRepository from '../../repositories/UsersRepository';

export default class AuthenticateUser {
  async execute(context: Record<string, any>, params: { email: string; password: string }) {
    const user = await UsersRepository.authenticate(params.email, params.password);

    if (!user) {
      throw new Unauthorized();
    }

    return { ...context, user };
  }
}
