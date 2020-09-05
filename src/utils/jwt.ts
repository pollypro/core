import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ISSUER } from '../constants/jwt';
import { UserObject } from '../repositories/mappers/users';

export const issueToken = (user: UserObject) =>
  jwt.sign({ user }, JWT_SECRET, { expiresIn: 86400, issuer: JWT_ISSUER });
