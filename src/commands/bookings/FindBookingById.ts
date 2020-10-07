import { BookingsRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

type Params = {
  bookingId: string;
};

export default class FindBookingById {
  async execute(context: Record<string, any>, params: Params) {
    const booking = await BookingsRepository.findById(params.bookingId);

    if (!booking) {
      throw new DocumentNotFound();
    }

    return { ...context, booking };
  }
}
