import { compareSync } from 'bcrypt';
import Unauthorized from '../../errors/Unauthorized';
import FindUserByEmail from './FindUserByEmail';
import { IUser } from '../../types/user';

type Params = {
  email: string;
  password: string;
};

export default class AuthenticateUser {
  public static readonly dependsOn = [FindUserByEmail];

  async execute(context: { user: IUser }, { password }: Params) {
    if (!compareSync(password, context.user.password)) {
      throw new Unauthorized();
    }

    return context;
  }
}
