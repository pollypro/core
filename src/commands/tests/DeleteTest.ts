import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';

export default class DeleteTest {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: Record<string, any>, { id }: { id: string }) {
    await TestsRepository.deleteById(id);
    return context;
  }
}
