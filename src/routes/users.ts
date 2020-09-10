import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CurrentUser from '../commands/users/CurrentUser';
import ListAdmins from '../commands/users/ListAdmins';
import verifyToken from '../middlewares/verifyToken';

const UsersRouter = Router();

UsersRouter.post('/get-self', verifyToken, async (request: Request, response: Response) => {
  const context = await runCommand(CurrentUser, {});
  response.status(200).json(context.currentUser);
});

UsersRouter.post('/list-admins', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(ListAdmins, {}, request.body);
    response.status(200).json(context.companies);
  } catch (e) {
    console.log(e);
  }
});

export default UsersRouter;
