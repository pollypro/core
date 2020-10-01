import { ObjectId } from 'mongodb';
import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

type Params = {
  test: {
    name: string;
    users?: string[];
  };
};

export default class CreateTest {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>, params: Params) {
    const test = await TestsRepository.insertOne({
      ...params.test,
      users: (params.test.users || []).map((id) => new ObjectId(id)),
    });
    return { ...context, test };
  }
}
