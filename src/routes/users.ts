import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CurrentUser from '../commands/users/CurrentUser';
import ListAdmins from '../commands/users/ListAdmins';
import DeleteUser from '../commands/users/DeleteUser';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const UsersRouter = Router();

UsersRouter.post('/get-self', verifyToken, async (request: Request, response: Response) => {
  const context = await runCommand(CurrentUser, {});
  response.status(200).json(context.currentUser);
});

UsersRouter.post('/list-admins', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(ListAdmins, {}, request.body);
    response.status(200).json(context.admins);
  } catch (error) {
    const status = httpCodeByError(error);
    response.sendStatus(status);
  }
});

UsersRouter.post('/delete-user', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(DeleteUser, {}, request.body);
    response.status(204).json(context.admins);
  } catch (error) {
    const status = httpCodeByError(error);
    response.sendStatus(status);
  }
});

export default UsersRouter;
