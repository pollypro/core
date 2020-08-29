import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

export default class ListCompanies {

  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>) {
    const companies = await CompaniesRepository.list();
    return { ...context, companies };
  }

}
