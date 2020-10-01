import { ObjectId } from 'mongodb';
import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindTestById from './FindTestById';
import { TestObject } from '../../repositories/mappers/tests';

export default class ListLinkedCompanies {
  public static readonly dependsOn = [CurrentUser, FindTestById];

  async execute(context: { test: TestObject }) {
    const linkedCompanies = await CompaniesRepository.list({
      query: { _id: { $in: context.test.companies.map((id) => new ObjectId(id)) } },
      params: { perPage: 500 },
    });

    return { ...context, linkedCompanies };
  }
}
