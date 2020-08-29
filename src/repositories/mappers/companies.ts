import { WithId } from 'mongodb';
import { CompanySchema } from '../../types/company';

export const mapCompany = (document: WithId<CompanySchema>) => ({
  id: document._id,
  name: document.name,
});
