import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import IssueAuthToken from '../commands/users/IssueAuthToken';

const AuthRouter = Router();

AuthRouter.post('/authenticate', async (request: Request, response: Response) => {
  try {
    const context = await runCommand(IssueAuthToken, {}, request.body);
    response.status(200).json({ token: context.token });
  } catch (e) {
    console.log(e);
  }
});

export default AuthRouter;
