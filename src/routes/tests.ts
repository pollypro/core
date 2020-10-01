import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import {
  CreateTest,
  DeleteTest,
  GetTest,
  LinkUser,
  ListLinkedUsers,
  ListTests,
  PublishTest,
  UnlinkUser,
  UnpublishTest,
  UpdateTest,
} from '../commands/tests';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const TestsRouter = Router();

TestsRouter.post(
  '/create-test',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(CreateTest, {}, request.body);
      response.status(200).json(context.test);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/update-test',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UpdateTest, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/delete-test',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(DeleteTest, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/get-test',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(GetTest, {}, request.body);
      response.status(200).json(context.test);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/publish-test',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(PublishTest, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/unpublish-test',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UnpublishTest, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/list-tests',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(ListTests, {}, request.body);
      response.status(200).json(context.tests);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/link-user',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(LinkUser, {}, request.body);
      response.sendStatus(204);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/unlink-user',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UnlinkUser, {}, request.body);
      response.sendStatus(204);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

TestsRouter.post(
  '/list-linked-users',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(ListLinkedUsers, {}, request.body);
      response.status(200).json(context.linkedUsers);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

export default TestsRouter;
