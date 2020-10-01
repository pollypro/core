import { UsersRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindUserById {
  async execute(context: Record<string, any>, { userId }: { userId: string }) {
    const user = await UsersRepository.findById(userId);

    if (!user) {
      throw new DocumentNotFound();
    }

    return { ...context, user };
  }
}
