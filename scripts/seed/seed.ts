import { config as configEnv } from 'dotenv-safe';
configEnv();

import { ObjectId } from 'mongodb';
import { getConnection } from '../../src/utils/mongodb';
import { CompaniesRepository, UsersRepository } from '../../src/repositories';
import { wipe } from './wipe';
import { superUser, superCompany } from './data';

const seed = async () => {
  const connection = await getConnection();

  await wipe();

  console.time('Seeding');
  const company = await CompaniesRepository.insertOne(superCompany);
  await UsersRepository.insertOne({
    ...superUser,
    companyId: new ObjectId(company.id),
  });
  console.timeEnd('Seeding');

  await connection.close();
};

seed();
