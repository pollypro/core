import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CurrentUser from '../commands/users/CurrentUser';
import verifyToken from '../middlewares/verifyToken';

const UsersRouter = Router();

UsersRouter.post('/get-self', verifyToken, async (request: Request, response: Response) => {
  const context = await runCommand(CurrentUser, {});
  response.status(200).json(context.currentUser);
});

export default UsersRouter;
