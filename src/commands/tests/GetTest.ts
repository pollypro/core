import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';

export default class GetTest {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: Record<string, any>) {
    return context;
  }
}
