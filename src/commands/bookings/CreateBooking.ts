import { ObjectId } from 'mongodb';
import { BookingsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { UserObject } from '../../repositories/mappers/users';
import * as yup from 'yup';
import ValidationFailed from '../../errors/ValidationFailed';

type Params = {
  booking: {
    interviewee: string;
    date?: string;
    testId: string;
    bookedBy: string;
  };
};

type Context = {
  currentUser: UserObject;
};

const ParamsSchema = yup.object({
  booking: yup
    .object({
      interviewee: yup.string().required(),
      date: yup.date(),
      testId: yup.string().required().test({ test: ObjectId.isValid }),
      bookedBy: yup.string().required().test({ test: ObjectId.isValid }),
    })
    .required(),
});

export default class CreateBooking {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Context, params: Params) {
    const validParams = await CreateBooking.validateParams(params);

    const booking = await BookingsRepository.insertOne({
      ...validParams.booking,
      date: new Date(validParams.booking.date),
    });
    return { ...context, booking };
  }

  static async validateParams(params: Params): Promise<Params> | never {
    try {
      return await ParamsSchema.validate(params, { stripUnknown: true });
    } catch (ValidationError) {
      throw new ValidationFailed();
    }
  }
}
