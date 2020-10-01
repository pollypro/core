import * as yup from 'yup';
import { ObjectId } from 'mongodb';
import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';
import { TestObject } from '../../repositories/mappers/tests';
import ValidationFailed from '../../errors/ValidationFailed';

type Params = {
  testId: string;
  userId: string;
};

const ParamsSchema = yup.object({
  testId: yup.string().required(),
  userId: yup.string().required(),
});

export default class UnlinkUser {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: { test: TestObject }, params: Params) {
    const validParams = await UnlinkUser.validateParams(params);

    await TestsRepository.updateById(validParams.testId, {
      users: context.test.users
        .filter((id) => validParams.userId !== id)
        .map((id) => new ObjectId(id)),
    });

    return context;
  }

  static async validateParams(params: Params): Promise<Params> | never {
    try {
      return await ParamsSchema.validate(params, { stripUnknown: true });
    } catch (ValidationError) {
      throw new ValidationFailed();
    }
  }
}
