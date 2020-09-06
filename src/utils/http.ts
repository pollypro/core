import Unauthorized from '../errors/Unauthorized';
import DocumentNotFound from '../errors/DocumentNotFound';

export const httpCodeByError = (error: any, customRules: Map<any, number> = new Map()) => {
  if (error instanceof Unauthorized) {
    return customRules.get(Unauthorized) ?? 401;
  }

  if (error instanceof DocumentNotFound) {
    return customRules.get(DocumentNotFound) ?? 404;
  }

  return 500;
};
