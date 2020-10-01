import { ObjectId } from 'mongodb';
import * as yup from 'yup';
import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';
import { TestObject } from '../../repositories/mappers/tests';
import ValidationFailed from '../../errors/ValidationFailed';

const uniqIds = (ids: string[]): ObjectId[] =>
  ids.filter((id, i) => ids.indexOf(id) === i).map((id) => new ObjectId(id));

type Params = {
  testId: string;
  userId: string;
};

const ParamsSchema = yup.object({
  testId: yup.string().required(),
  userId: yup.string().required(),
});

export default class LinkUser {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: { test: TestObject }, params: Params) {
    const validParams = await LinkUser.validateParams(params);

    await TestsRepository.updateById(validParams.testId, {
      users: uniqIds([...context.test.users, validParams.userId]),
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
