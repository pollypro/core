import { hashSync } from 'bcrypt';
import { UsersRepository } from '../../src/repositories';

export const seedUsers = async () => {
  await UsersRepository.insertOne({
    firstName: 'Ivan',
    lastName: 'Stetsenko',
    company: 'Test company',
    phone: '+380933814747',
    email: 'i.stetsenko1@gmail.com',
    permissions: [],
    status: 'activated',
    password: hashSync('password', 8),
  });
  console.log('Users seeded');
};
