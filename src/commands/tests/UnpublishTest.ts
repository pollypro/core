import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';

export default class UnpublishTest {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: Record<string, any>, { testId }: { testId: string }) {
    await TestsRepository.updateById(testId, {
      published: false,
      publishedAt: null,
    });
    return context;
  }
}
