import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import {
  ActivateUser,
  CreateAdmin,
  CurrentUser,
  DeactivateUser,
  DeleteUser,
  ListAdmins,
  ListUsers,
  SearchUsersByFirstLastName,
  UpdateUser,
} from '../commands/users';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const UsersRouter = Router();

UsersRouter.post(
  '/get-self',
  verifyToken,
  async (request: Request, response: Response) => {
    const context = await runCommand(CurrentUser, {});
    response.status(200).json(context.currentUser);
  },
);

UsersRouter.post(
  '/list-admins',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(ListAdmins, {}, request.body);
      response.status(200).json(context.admins);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/list-users',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(ListUsers, {}, request.body);
      response.status(200).json(context.users);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/delete-user',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(DeleteUser, {}, request.body);
      response.status(204).json(context.admins);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/update-user',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UpdateUser, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/activate-user',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(ActivateUser, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/deactivate-user',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(DeactivateUser, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/create-admin',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(CreateAdmin, {}, request.body);
      response.status(200).send(context.admin);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

UsersRouter.post(
  '/search-users',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(SearchUsersByFirstLastName, {}, request.body);
      response.status(200).send(context.users);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

export default UsersRouter;
