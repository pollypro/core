import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindCompanyById from './FindCompanyById';

export default class UpdateCompany {
  public static readonly dependsOn = [CurrentUser, FindCompanyById];

  async execute(
    context: Record<string, any>,
    { companyId, company }: { companyId: string; company: { name?: string } },
  ) {
    await CompaniesRepository.updateById(companyId, company);
    return context;
  }
}
