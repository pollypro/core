import { WithId } from 'mongodb';

export type ServiceSchema = WithId<{
  name: string;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
}>;
