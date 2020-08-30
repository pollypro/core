import { UserSchema } from '../schemas/User';

export const mapUser = (document: UserSchema) => ({
  id: document._id,
  firstName: document.firstName,
  lastName: document.lastName,
  company: document.company,
  permissions: document.permissions,
  phone: document.phone,
  email: document.email,
  status: document.status,
});
