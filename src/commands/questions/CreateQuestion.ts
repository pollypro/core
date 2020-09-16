import { QuestionsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from '../services/FindServiceById';

type Params = {
  question: {
    question: string;
  };
  serviceId: string;
};

export default class CreateQuestion {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: Record<string, any>, params: Params) {
    const question = await QuestionsRepository.insertOne({
      ...params.question,
      serviceId: params.serviceId,
    });
    return { ...context, question };
  }
}
