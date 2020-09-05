import { WithId, ObjectId } from 'mongodb';

export type UserSchema = WithId<{
  firstName: string;
  lastName: string;
  companyId?: ObjectId;
  permissions: string[];
  phone: string;
  email: string;
  password: string;
  status: string;
}>;
