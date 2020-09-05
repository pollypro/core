import { hashSync } from "bcrypt";

export const superUser = {
  firstName: 'Ivan',
  lastName: 'Stetsenko',
  phone: '+380933814747',
  email: 'i.stetsenko1@gmail.com',
  // @ts-ignore
  permissions: [],
  status: 'activated',
  password: hashSync('password', 8),
};

export const superCompany = {
  name: 'Super company',
};
