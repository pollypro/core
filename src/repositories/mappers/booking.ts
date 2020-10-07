import { BookingSchema } from '../schemas/Booking';

export type BookingObject = {
  id: string;
  interviewee: string;
  date?: Date;
  testId: string;
  bookedBy: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapBooking = (document?: BookingSchema): BookingObject | null => {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toString(),
    interviewee: document.interviewee,
    date: document.date,
    testId: document.testId.toString(),
    bookedBy: document.bookedBy.toString(),
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
