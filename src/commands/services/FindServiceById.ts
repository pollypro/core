import { ServicesRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindServiceById {
  async execute(context: Record<string, any>, { id }: { id: string }) {
    const service = await ServicesRepository.findById(id);

    if (!service) {
      throw new DocumentNotFound();
    }

    return { ...context, service };
  }
}
