import { ObjectId } from 'mongodb';
import { getConnection, collectionExists } from '../utils/mongodb';
import { BookingSchema } from './schemas/Booking';
import { mapBooking } from './mappers/booking';

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

  static async drop() {
    if (await collectionExists(BookingsRepository.collectionName)) {
      const collection = await BookingsRepository.getCollection();
      await collection.drop();
    }
  }
}
