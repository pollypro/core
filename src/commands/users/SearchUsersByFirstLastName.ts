import * as yup from 'yup';
import { UsersRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';
import ValidationFailed from "../../errors/ValidationFailed";

type Params = {
  query: string,
  params?: PaginationParams
};

const ParamsSchema = yup.object({
  query: yup.string().required(),
});

export default class SearchUsersByFirstLastName {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    params: Params = { query: '', params: {} },
  ) {
    const validParams = await SearchUsersByFirstLastName.validateParams(params);

    const users = await UsersRepository.searchByFirstLastName(validParams);
    return { ...context, users };
  }

  static async validateParams(params: Params): Promise<Params> | never {
    try {
      return await ParamsSchema.validate(params, { stripUnknown: true });
    } catch (ValidationError) {
      throw new ValidationFailed();
    }
  }
}
