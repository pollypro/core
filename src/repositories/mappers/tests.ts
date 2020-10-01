import { TestSchema } from '../schemas/Test';

export type TestObject = {
  id: string;
  name: string;
  published: boolean;
  companies: string[];
  users: string[];
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
};

export const mapTest = (document?: TestSchema): TestObject | null => {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toString(),
    name: document.name,
    published: document.published,
    companies: (document.companies || []).map((_id) => _id.toString()),
    users: (document.users || []).map((_id) => _id.toString()),
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    publishedAt: document.publishedAt,
  };
};
