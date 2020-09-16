import { CompaniesRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindCompanyById {
  async execute(context: Record<string, any>, { companyId }: { companyId: string }) {
    const company = await CompaniesRepository.findById(companyId);

    if (!company) {
      throw new DocumentNotFound();
    }

    return { ...context, company };
  }
}
