import DocumentNotFound from '../errors/DocumentNotFound';
import Unauthorized from '../errors/Unauthorized';
import ValidationFailed from '../errors/ValidationFailed';

export const httpCodeByError = (
  error: any,
  customRules: Map<any, number> = new Map(),
) => {
  if (error instanceof Unauthorized) {
    return customRules.get(Unauthorized) ?? 401;
  }

  if (error instanceof DocumentNotFound) {
    return customRules.get(DocumentNotFound) ?? 404;
  }

  if (error instanceof ValidationFailed) {
    return customRules.get(ValidationFailed) ?? 400;
  }

  return 500;
};
