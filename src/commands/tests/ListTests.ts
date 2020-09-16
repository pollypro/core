import { TestsRepository } from '../../repositories';
import CurrentUser from '../users/CurrentUser';
import { PaginationParams } from '../../repositories/utils/pagination';

export default class ListTests {
  public static readonly dependsOn = [CurrentUser];

  async execute(
    context: Record<string, any>,
    { params }: { params: PaginationParams } = { params: {} },
  ) {
    const tests = await TestsRepository.list({ params });
    return { ...context, tests };
  }
}
