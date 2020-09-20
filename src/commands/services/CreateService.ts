import { ObjectId } from 'mongodb';
import { ServicesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

type Params = {
  service: {
    name: string;
    companies?: string[];
    users?: string[];
  };
};

export default class CreateService {
  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>, params: Params) {
    const service = await ServicesRepository.insertOne({
      ...params.service,
      companies: (params.service.companies || []).map((id) => new ObjectId(id)),
      users: (params.service.users || []).map((id) => new ObjectId(id)),
    });
    return { ...context, service };
  }
}
