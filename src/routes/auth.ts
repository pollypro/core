import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import IssueAuthToken from '../commands/users/IssueAuthToken';
import { httpCodeByError } from '../utils/http';

const AuthRouter = Router();

AuthRouter.post('/authenticate', async (request: Request, response: Response) => {
  try {
    const context = await runCommand(IssueAuthToken, {}, request.body);
    response.status(200).json({ token: context.token });
  } catch (error) {
    const status = httpCodeByError(error);
    response.sendStatus(status);
  }
});

export default AuthRouter;
