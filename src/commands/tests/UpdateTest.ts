import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';

export default class UpdateTest {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(
    context: Record<string, any>,
    { testId, test }: { testId: string; test: { name?: string } },
  ) {
    await TestsRepository.updateById(testId, test);
    return context;
  }
}
