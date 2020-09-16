import { QuestionsRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindQuestionById {
  async execute(context: Record<string, any>, { questionId }: { questionId: string }) {
    const question = await QuestionsRepository.findById(questionId);

    if (!question) {
      throw new DocumentNotFound();
    }

    return { ...context, question };
  }
}
