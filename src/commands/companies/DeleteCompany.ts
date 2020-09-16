import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindCompanyById from './FindCompanyById';

export default class DeleteCompany {
  public static readonly dependsOn = [CurrentUser, FindCompanyById];

  async execute(context: Record<string, any>, { companyId }: { companyId: string }) {
    await CompaniesRepository.deleteById(companyId);
    return context;
  }
}
