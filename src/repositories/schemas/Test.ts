import { WithId, ObjectId } from 'mongodb';

export type TestSchema = WithId<{
  name: string;
  published: boolean;
  users?: ObjectId[];
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}>;
