import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

type Params = {
  test: {
    name: string;
  };
};

export default class CreateTest {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>, params: Params) {
    const test = await TestsRepository.insertOne(params.test);
    return { ...context, test };
  }
}
