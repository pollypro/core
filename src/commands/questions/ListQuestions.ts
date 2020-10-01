import { ObjectId } from 'mongodb';
import { QuestionsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

export default class ListQuestions {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { query }: { query: { testId?: string } } = { query: {} },
  ) {
    const listQuery: { testId?: ObjectId } = {};

    if (query.testId) {
      listQuery.testId = new ObjectId(query.testId);
    }

    const questions = await QuestionsRepository.list({ query: listQuery });
    return { ...context, questions };
  }
}
