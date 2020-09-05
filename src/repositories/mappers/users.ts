import { UserSchema } from '../schemas/User';

export type UserObject = {
  id: string;
  firstName: string,
  lastName: string,
  companyId?: string,
  permissions: string[],
  phone: string,
  email: string,
  status: string,
};

export const mapUser = (document: UserSchema): UserObject => ({
  id: document._id.toString(),
  firstName: document.firstName,
  lastName: document.lastName,
  companyId: document.companyId,
  permissions: document.permissions,
  phone: document.phone,
  email: document.email,
  status: document.status,
});
