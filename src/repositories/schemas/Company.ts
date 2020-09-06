import { WithId } from 'mongodb';

export type CompanySchema = WithId<{
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}>;
