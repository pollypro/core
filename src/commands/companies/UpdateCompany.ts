import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindCompanyById from './FindCompanyById';

export default class UpdateCompany {
  public static readonly dependsOn = [CurrentUser, FindCompanyById];

  async execute(
    context: Record<string, any>,
    { id, company }: { id: string; company: { name?: string } },
  ) {
    await CompaniesRepository.updateById(id, company);
    return context;
  }
}
