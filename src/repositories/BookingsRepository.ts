import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { BookingSchema } from './schemas/Booking';
import { mapBooking } from './mappers/booking';

type NewBookingDocument = {
  interviewee: string;
  date?: Date;
  testId: ObjectId | string;
  bookedBy: ObjectId | string;
};

export default class BookingsRepository {
  static readonly collectionName = 'bookings';

  static async getCollection() {
    const connection = await getConnection();
    return connection.db().collection<BookingSchema>(BookingsRepository.collectionName);
  }

  static async findById(id: string) {
    const collection = await BookingsRepository.getCollection();

    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return mapBooking(result);
    } catch (e) {
      throw e;
    }
  }

  static async insertOne(document: NewBookingDocument) {
    const collection = await BookingsRepository.getCollection();

    try {
      const result = await collection.insertOne({
        ...document,
        testId: new ObjectId(document.testId),
        bookedBy: new ObjectId(document.bookedBy),
        createdAt: new Date(),
      });
      return mapBooking(result.ops[0]);
    } catch (e) {
      throw e;
    }
  }

  static async drop() {
    if (await collectionExists(BookingsRepository.collectionName)) {
      const collection = await BookingsRepository.getCollection();
      await collection.drop();
    }
  }
}
