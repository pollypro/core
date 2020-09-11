import { hash } from 'bcrypt';
import { generate as generatePassword } from 'generate-password';
import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

type Params = {
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export default class CreateAdmin {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>, params: Params) {
    const admin = await UsersRepository.insertOne({
      ...params.admin,
      isAdmin: true,
      status: 'invited',
      password: await hash(
        generatePassword({
          length: 16,
          uppercase: true,
          numbers: true,
        }),
        8,
      ),
    });

    return { ...context, admin };
  }
}
