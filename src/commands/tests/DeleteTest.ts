import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';

export default class DeleteTest {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: Record<string, any>, { testId }: { testId: string }) {
    await TestsRepository.deleteById(testId);
    return context;
  }
}
