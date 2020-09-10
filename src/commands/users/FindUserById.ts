import { UsersRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindUserById {
  async execute(context: Record<string, any>, { id }: { id: string }) {
    const company = await UsersRepository.findById(id);

    if (!company) {
      throw new DocumentNotFound();
    }

    return { ...context, company };
  }
}
