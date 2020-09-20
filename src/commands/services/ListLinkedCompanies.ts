import { ObjectId } from 'mongodb';
import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';
import { ServiceObject } from '../../repositories/mappers/services';

export default class ListLinkedCompanies {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: { service: ServiceObject }) {
    const linkedCompanies = await CompaniesRepository.list({
      query: { _id: { $in: context.service.companies.map((id) => new ObjectId(id)) } },
      params: { perPage: 500 },
    });

    return { ...context, linkedCompanies };
  }
}
