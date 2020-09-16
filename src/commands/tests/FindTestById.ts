import { TestsRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindTestById {
  async execute(context: Record<string, any>, { id }: { id: string }) {
    const test = await TestsRepository.findById(id);

    if (!test) {
      throw new DocumentNotFound();
    }

    return { ...context, test };
  }
}
