import { WithId, ObjectId } from 'mongodb';

export type TestSchema = WithId<{
  name: string;
  published: boolean;
  companies?: ObjectId[];
  users?: ObjectId[];
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}>;
