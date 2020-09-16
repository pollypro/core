import { QuestionsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindQuestionById from './FindQuestionById';

export default class UpdateQuestion {
  public static readonly dependsOn = [CurrentUser, FindQuestionById];

  async execute(
    context: Record<string, any>,
    { questionId, question }: { questionId: string; question: { question?: string } },
  ) {
    await QuestionsRepository.updateById(questionId, question);
    return context;
  }
}
