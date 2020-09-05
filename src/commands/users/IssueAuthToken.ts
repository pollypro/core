import { issueToken } from '../../utils/jwt';
import AuthenticateUser from './AuthenticateUser';
import { UserObject } from '../../repositories/mappers/users';

export default class IssueAuthToken {
  public static readonly dependsOn = [AuthenticateUser];

  async execute(context: { user: UserObject }) {
    const token = issueToken(context.user);
    return { ...context, token };
  }
}
