import { config as configEnv } from 'dotenv-safe';
configEnv();

import { seedUsers } from './users';
import { wipe } from './wipe';

const seed = async () => {
  await wipe();
  await seedUsers();
};

seed();
