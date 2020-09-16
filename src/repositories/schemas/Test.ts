import { WithId } from 'mongodb';

export type TestSchema = WithId<{
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}>;
