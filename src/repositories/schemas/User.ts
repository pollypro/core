import { WithId } from 'mongodb';

export type UserSchema = WithId<{
  firstName: string;
  lastName: string;
  companyId?: string;
  permissions: string[];
  phone: string;
  email: string;
  password: string;
  status: string;
}>;
