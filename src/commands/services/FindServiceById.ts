import { ServicesRepository } from '../../repositories';
import DocumentNotFound from '../../errors/DocumentNotFound';

export default class FindServiceById {
  async execute(context: Record<string, any>, { serviceId }: { serviceId: string }) {
    const service = await ServicesRepository.findById(serviceId);

    if (!service) {
      throw new DocumentNotFound();
    }

    return { ...context, service };
  }
}
