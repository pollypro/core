import { WithId, ObjectId } from 'mongodb';

export type QuestionSchema = WithId<{
  question: string;
  serviceId: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}>;
