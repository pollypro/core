import * as yup from 'yup';
import { ObjectId } from 'mongodb';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';
import ValidationFailed from '../../errors/ValidationFailed';

type Params = {
  serviceId: string;
  users?: string[];
  companies?: string[];
};

const ParamsSchema = yup.object({
  serviceId: yup.string().required(),
  users: yup.array().of(yup.string()).optional().default([]),
  companies: yup.array().of(yup.string()).optional().default([]),
});

export default class UnlinkUsersFromService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: { service: ServiceObject }, params: Params) {
    const validParams = await UnlinkUsersFromService.validateParams(params);

    await ServicesRepository.updateById(validParams.serviceId, {
      users: context.service.users
        .filter((id) => !validParams.users.includes(id))
        .map((id) => new ObjectId(id)),
      companies: context.service.companies
        .filter((id) => !validParams.companies.includes(id))
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
