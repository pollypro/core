import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ISSUER } from '../constants/jwt';
import { IUser } from '../types/user';

export const issueToken = (user: IUser) =>
  jwt.sign({ user }, JWT_SECRET, { expiresIn: 86400, issuer: JWT_ISSUER });
