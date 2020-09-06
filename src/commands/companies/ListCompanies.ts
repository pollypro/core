import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';

export default class ListCompanies {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const companies = await CompaniesRepository.list({ params });
    return { ...context, companies };
  }
}
