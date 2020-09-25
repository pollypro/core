import { config as configEnv } from 'dotenv-safe';
configEnv();

import { getConnection } from '../../src/utils/mongodb';
import { CompaniesRepository, UsersRepository } from '../../src/repositories';
import { wipe } from './wipe';
import {
  admin1,
  admin2,
  admin3,
  user1,
  user2,
  superCompany,
  company1,
  company2,
  company3,
} from './data';

const seed = async () => {
  const connection = await getConnection();

  await wipe();

  console.time('Seeding');
  await CompaniesRepository.insertOne(company1);
  await CompaniesRepository.insertOne(company2);
  await CompaniesRepository.insertOne(company3);

  const company = await CompaniesRepository.insertOne(superCompany);
  await UsersRepository.insertOne({
    ...admin1,
    companyId: company.id,
  });

  await UsersRepository.insertOne(admin2);
  await UsersRepository.insertOne(admin3);

  await UsersRepository.insertOne(user1);
  await UsersRepository.insertOne(user2);
  console.timeEnd('Seeding');

  await connection.close();
};

seed();
