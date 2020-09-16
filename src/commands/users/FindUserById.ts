import { UsersRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindUserById {
  async execute(context: Record<string, any>, { userId }: { userId: string }) {
    const company = await UsersRepository.findById(userId);

    if (!company) {
      throw new DocumentNotFound();
    }

    return { ...context, company };
  }
}
