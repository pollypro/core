import { CompanySchema } from '../schemas/company';

export type CompanyObject = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapCompany = (document?: CompanySchema): CompanyObject | null => {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toString(),
    name: document.name,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
