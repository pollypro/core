import { WithId } from 'mongodb';
import { CompanySchema } from '../schemas/company';

export const mapCompany = (document: WithId<CompanySchema>) => ({
  id: document._id,
  name: document.name,
});
