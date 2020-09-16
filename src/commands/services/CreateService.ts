import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

type Params = {
  service: {
    name: string;
  };
};

export default class CreateService {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>, params: Params) {
    const service = await ServicesRepository.insertOne(params.service);
    return { ...context, service };
  }
}
