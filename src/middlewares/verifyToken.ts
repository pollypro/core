// imports from vendors
import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import jwt from 'jsonwebtoken';

// imports from constants
import { JWT_ISSUER, JWT_SECRET } from '../constants/jwt';

export default (request: Request, response: Response, next: NextFunction) => {
  const sendForbidden = () => response.status(403).send();

  const authorization = request.headers.authorization;

  if (!authorization) {
    return sendForbidden();
  }

  const [type, token] = authorization.split(' ');

  if (!type || !token || type !== 'Bearer') {
    sendForbidden();
  }

  jwt.verify(
    token,
    JWT_SECRET,
    { issuer: JWT_ISSUER },
    (error, decoded: { user: any }) => {
      if (error) {
        sendForbidden();
      }

      httpContext.set('currentUser', decoded.user);

      next();
    },
  );
};
