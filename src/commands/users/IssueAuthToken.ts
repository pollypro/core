import { issueToken } from '../../utils/jwt';
import AuthenticateUser from './AuthenticateUser';
import FindUserByEmail from './FindUserByEmail';
import { IUser } from '../../types/user';

export default class IssueAuthToken {
  public static readonly dependsOn = [FindUserByEmail, AuthenticateUser];

  async execute(context: { user: IUser }) {
    const token = issueToken(context.user);
    return { ...context, token };
  }
}
