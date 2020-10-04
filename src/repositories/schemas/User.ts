import { WithId, ObjectId } from 'mongodb';
import { UserStatus } from '../../constants/users';

export type UserSchema = WithId<{
  firstName: string;
  lastName: string;
  companyId?: ObjectId;
  isAdmin?: boolean;
  phone: string;
  email: string;
  password: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt?: Date;
}>;
