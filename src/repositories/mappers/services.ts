import { ServiceSchema } from '../schemas/Service';

export type ServiceObject = {
  id: string;
  name: string;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapService = (document?: ServiceSchema): ServiceObject | null => {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toString(),
    name: document.name,
    published: document.published,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
