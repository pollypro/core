import * as yup from 'yup';
import Unauthorized from '../../errors/Unauthorized';
import ValidationFailed from '../../errors/ValidationFailed';
import UsersRepository from '../../repositories/UsersRepository';

type Params = {
  email: string;
  password: string;
};

const ParamsSchema = yup.object({
  email: yup.string().required().lowercase(),
  password: yup.string().required(),
});

export default class AuthenticateUser {
  async execute(context: Record<string, any>, params: Params) {
    const validParams = await AuthenticateUser.validateParams(params);

    const user = await UsersRepository.authenticate(
      validParams.email,
      validParams.password,
    );

    if (!user) {
      throw new Unauthorized();
    }

    return { ...context, user };
  }

  static async validateParams(params: Params): Promise<Params> | never {
    try {
      return await ParamsSchema.validate(params, { stripUnknown: true });
    } catch (ValidationError) {
      throw new ValidationFailed();
    }
  }
}
