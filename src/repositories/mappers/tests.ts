import { TestSchema } from '../schemas/Test';

export type TestObject = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapTest = (document?: TestSchema): TestObject | null => {
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
