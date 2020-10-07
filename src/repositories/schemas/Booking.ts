import { WithId, ObjectId } from 'mongodb';

export type BookingSchema = WithId<{
  interviewee: string;
  date?: Date;
  testId: ObjectId;
  bookedBy: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}>;
