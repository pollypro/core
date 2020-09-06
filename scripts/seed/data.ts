import { hashSync } from 'bcrypt';

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

export const company1 = {
  name: 'Company 2',
};

export const company2 = {
  name: 'Company 2',
};

export const company3 = {
  name: 'Company 3',
};
