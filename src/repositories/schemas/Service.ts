import { WithId } from 'mongodb';

export type ServiceSchema = WithId<{
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}>;
