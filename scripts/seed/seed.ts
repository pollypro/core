import { config as configEnv } from 'dotenv-safe';
configEnv();

import { getConnection } from '../../src/utils/mongodb';
import { seedUsers } from './users';
import { wipe } from './wipe';

const seed = async () => {
  const connection = await getConnection();

  await wipe();
  await seedUsers();

  await connection.close();
};

seed();
