import { config as configEnv } from 'dotenv-safe';
configEnv();

import { getConnection } from '../../src/utils/mongodb';
import { CompaniesRepository, UsersRepository } from '../../src/repositories';
import { wipe } from './wipe';
import {
  superUser,
  superUser1,
  superUser2,
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
    ...superUser,
    companyId: company.id,
  });

  await UsersRepository.insertOne(superUser1);
  await UsersRepository.insertOne(superUser2);
  console.timeEnd('Seeding');

  await connection.close();
};

seed();
