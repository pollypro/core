import { UserSchema } from '../schemas/User';

export type UserObject = {
  id: string;
  firstName: string;
  lastName: string;
  companyId?: string;
  isAdmin: boolean;
  phone: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapUser = (document?: UserSchema): UserObject | null => {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toString(),
    firstName: document.firstName,
    lastName: document.lastName,
    companyId: document.companyId?.toString(),
    isAdmin: Boolean(document.isAdmin),
    phone: document.phone,
    email: document.email,
    status: document.status,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
