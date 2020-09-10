import { WithId, ObjectId } from 'mongodb';

export type UserSchema = WithId<{
  firstName: string;
  lastName: string;
  companyId?: ObjectId;
  isAdmin?: boolean;
  phone: string;
  email: string;
  password: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}>;
