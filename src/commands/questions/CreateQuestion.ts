import { QuestionsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from '../tests/FindTestById';

type Params = {
  question: {
    question: string;
  };
  testId: string;
};

export default class CreateQuestion {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: Record<string, any>, params: Params) {
    const question = await QuestionsRepository.insertOne({
      ...params.question,
      testId: params.testId,
    });
    return { ...context, question };
  }
}
