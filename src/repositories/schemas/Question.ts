import { WithId, ObjectId } from 'mongodb';

export type QuestionSchema = WithId<{
  question: string;
  testId: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}>;
