import { CompaniesRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';

type Params = {
  company: {
    name: string;
  }
}

export default class CreateCompany {

  public static readonly dependsOn = [CurrentUser];

  async execute(context: Record<string, any>, params: Params) {
    const company = await CompaniesRepository.insertOne(params.company);
    return { ...context, company };
  }

}
