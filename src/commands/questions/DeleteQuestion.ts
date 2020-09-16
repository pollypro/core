import { QuestionsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindQuestionById from './FindQuestionById';

export default class DeleteQuestion {
  public static readonly dependsOn = [CurrentUser, FindQuestionById];

  async execute(context: Record<string, any>, { questionId }: { questionId: string }) {
    await QuestionsRepository.deleteById(questionId);
    return context;
  }
}
