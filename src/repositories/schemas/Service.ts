import { WithId, ObjectId } from 'mongodb';

export type ServiceSchema = WithId<{
  name: string;
  published: boolean;
  companies?: ObjectId[];
  users?: ObjectId[];
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}>;
