import { UsersRepository } from '../../src/repositories';

export const wipe = async () => {
  await UsersRepository.drop();
  console.log('Users dropped');
};
