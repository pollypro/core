import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import { IssueAuthToken } from '../commands/users';
import { httpCodeByError } from '../utils/http';
import DocumentNotFound from '../errors/DocumentNotFound';

const AuthRouter = Router();

AuthRouter.post('/authenticate', async (request: Request, response: Response) => {
  try {
    const context = await runCommand(IssueAuthToken, {}, request.body);
    response.status(200).json({ token: context.token });
  } catch (error) {
    const status = httpCodeByError(error, new Map().set(DocumentNotFound, 401));
    response.sendStatus(status);
  }
});

export default AuthRouter;
