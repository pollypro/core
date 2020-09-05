import { UsersRepository } from '../../src/repositories';
import { CompaniesRepository } from '../../src/repositories';

export const wipe = async () => {
  console.time('DB wipe');
  await CompaniesRepository.drop();
  await UsersRepository.drop();
  console.timeEnd('DB wipe');
};
