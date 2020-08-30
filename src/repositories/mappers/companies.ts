import { CompanySchema } from '../schemas/company';

export const mapCompany = (document: CompanySchema) => ({
  id: document._id,
  name: document.name,
});
