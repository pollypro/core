import { ObjectId } from 'mongodb';
import { QuestionsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

export default class ListQuestions {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { query }: { query: { serviceId?: string } } = { query: {} },
  ) {
    const listQuery: { serviceId?: ObjectId } = {};

    if (query.serviceId) {
      listQuery.serviceId = new ObjectId(query.serviceId);
    }

    const questions = await QuestionsRepository.list({ query: listQuery });
    return { ...context, questions };
  }
}
