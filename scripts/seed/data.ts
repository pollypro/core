import { hashSync } from 'bcrypt';

export const admin1 = {
  firstName: 'Ivan',
  lastName: 'Stetsenko',
  phone: '+380933814747',
  email: 'i.stetsenko1@gmail.com',
  isAdmin: true,
  status: 'activated',
  password: hashSync('password', 8),
};

export const admin2 = {
  firstName: 'Admin',
  lastName: 'Adminenko 1',
  phone: '+380933814747',
  email: 'admin1@gmail.com',
  isAdmin: true,
  status: 'activated',
  password: hashSync('password', 8),
};

export const admin3 = {
  firstName: 'Admin',
  lastName: 'Adminenko 2',
  phone: '+380933814747',
  email: 'admin2@gmail.com',
  isAdmin: true,
  status: 'activated',
  password: hashSync('password', 8),
};

export const user1 = {
  firstName: 'User',
  lastName: 'Userenko',
  phone: '+380931234567',
  email: 'user1@gmail.com',
  isAdmin: false,
  status: 'inactive',
  password: hashSync('password', 8),
};

export const user2 = {
  firstName: 'User',
  lastName: 'Userovich',
  phone: '+380931234567',
  email: 'i.stetsenko1@gmail.com',
  isAdmin: false,
  status: 'inactive',
  password: hashSync('password', 8),
};

export const superCompany = {
  name: 'Super company',
};

export const company1 = {
  name: 'Company 1',
};

export const company2 = {
  name: 'Company 2',
};

export const company3 = {
  name: 'Company 3',
};
