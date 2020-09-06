import { CompaniesRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindCompanyById {
  async execute(context: Record<string, any>, { id }: { id: string }) {
    const company = await CompaniesRepository.findById(id);

    if (!company) {
      throw new DocumentNotFound();
    }

    return { ...context, company };
  }
}
