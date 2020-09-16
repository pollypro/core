import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';

export default class UpdateTest {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(
    context: Record<string, any>,
    { id, test }: { id: string; test: { name?: string } },
  ) {
    await TestsRepository.updateById(id, test);
    return context;
  }
}
