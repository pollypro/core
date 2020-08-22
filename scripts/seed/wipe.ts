import { UsersRepository } from '../../src/repositories';

export const wipe = async () => {
  await UsersRepository.wipe();
  console.log('Users wiped');
};
