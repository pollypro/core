import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import FindServiceById from './FindServiceById';

export default class DeleteService {
  public static readonly dependsOn = [CurrentUser, FindServiceById];

  async execute(context: Record<string, any>, { id }: { id: string }) {
    await ServicesRepository.deleteById(id);
    return context;
  }
}
