import { ObjectId } from 'mongodb';
import * as yup from 'yup';
import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { UserObject } from '../../repositories/mappers/users';
import ValidationFailed from '../../errors/ValidationFailed';

type Context = {
  currentUser: UserObject;
};

type Params = {
  test: {
    name: string;
    users?: string[];
  };
};

const ParamsSchema = yup.object({
  test: yup
    .object({
      name: yup.string().required(),
      users: yup.array().of(yup.string()).optional().default([]), // TODO: ObjectId.isValid otherwise 500
    })
    .required(),
});

export default class CreateTest {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Context, params: Params) {
    const validParams = await CreateTest.validateParams(params);

    const test = await TestsRepository.insertOne({
      ...validParams.test,
      users: validParams.test.users.map((id) => new ObjectId(id)),
    });
    return { ...context, test };
  }

  static async validateParams(params: Params): Promise<Params> | never {
    try {
      return await ParamsSchema.validate(params, { stripUnknown: true });
    } catch (ValidationError) {
      throw new ValidationFailed();
    }
  }
}
