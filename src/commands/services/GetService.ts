import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';

export default class GetService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: Record<string, any>) {
    return context;
  }
}
