import { TestsRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindTestById {
  async execute(context: Record<string, any>, { testId }: { testId: string }) {
    const test = await TestsRepository.findById(testId);

    if (!test) {
      throw new DocumentNotFound();
    }

    return { ...context, test };
  }
}
