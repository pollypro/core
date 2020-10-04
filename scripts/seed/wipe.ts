import {
  CompaniesRepository,
  QuestionsRepository,
  TestsRepository,
  UsersRepository,
} from '../../src/repositories';

export const wipe = async () => {
  console.time('DB wipe');
  await CompaniesRepository.drop();
  await QuestionsRepository.drop();
  await TestsRepository.drop();
  await UsersRepository.drop();
  console.timeEnd('DB wipe');
};
