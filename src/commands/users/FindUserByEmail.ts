import { UsersRepository } from '../../repositories';

export default class FindUserByEmail {
  async execute(context: Record<string, any>, { email }: { email: string }) {
    const user = await UsersRepository.findByEmail(email);
    return { ...context, user };
  }
}
