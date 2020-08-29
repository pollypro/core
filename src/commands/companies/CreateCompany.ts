import { CompaniesRepository } from '../../repositories';

type Params = {
  company: {
    name: string;
  }
}

export default class CreateCompany {

  async execute(context: Record<string, any>, params: Params) {
    const company = await CompaniesRepository.insertOne(params.company);
    return { ...context, company };
  }

}
