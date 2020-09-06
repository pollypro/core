import { CompanySchema } from '../schemas/company';

export type CompanyObject = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapCompany = (document: CompanySchema): CompanyObject => ({
  id: document._id.toString(),
  name: document.name,
  createdAt: document.createdAt,
  updatedAt: document.updatedAt,
});
