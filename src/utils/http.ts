import Unauthorized from '../errors/Unauthorized';

export const httpCodeByError = (error: any) => {
  if (error instanceof Unauthorized) {
    return 401;
  }

  return 500;
};
