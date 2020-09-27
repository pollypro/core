import { ObjectId } from 'mongodb';
import * as yup from 'yup';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';
import ValidationFailed from '../../errors/ValidationFailed';

const uniqIds = (ids: string[]): ObjectId[] =>
  ids.filter((id, i) => ids.indexOf(id) === i).map((id) => new ObjectId(id));

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

export default class LinkUsersToService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: { service: ServiceObject }, params: Params) {
    const validParams = await LinkUsersToService.validateParams(params);

    await ServicesRepository.updateById(validParams.serviceId, {
      users: uniqIds([...context.service.users, ...validParams.users]),
      companies: uniqIds([...context.service.companies, ...validParams.companies]),
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
