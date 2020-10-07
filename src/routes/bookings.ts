import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CreateBooking from '../commands/bookings/CreateBooking';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const BookingsRouter = Router();

BookingsRouter.post(
  '/create-booking',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(CreateBooking, {}, request.body);
      response.status(200).json(context.booking);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

export default BookingsRouter;
