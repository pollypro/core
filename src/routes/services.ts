import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CreateService from '../commands/services/CreateService';
import UpdateService from '../commands/services/UpdateService';
import DeleteService from '../commands/services/DeleteService';
import ListServices from '../commands/services/ListServices';
import PublishService from '../commands/services/PublishService';
import UnpublishService from '../commands/services/UnpublishService';
import GetService from '../commands/services/GetService';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const ServicesRouter = Router();

ServicesRouter.post(
  '/create-service',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(CreateService, {}, request.body);
      response.status(200).json(context.service);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

ServicesRouter.post(
  '/update-service',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UpdateService, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

ServicesRouter.post(
  '/delete-service',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(DeleteService, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

ServicesRouter.post('/get-service', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(GetService, {}, request.body);
    response.status(200).json(context.service);
  } catch (error) {
    const status = httpCodeByError(error);
    response.sendStatus(status);
  }
});

ServicesRouter.post(
  '/publish-service',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(PublishService, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

ServicesRouter.post(
  '/unpublish-service',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UnpublishService, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

ServicesRouter.post('/list-services', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(ListServices, {}, request.body);
    response.status(200).json(context.services);
  } catch (error) {
    const status = httpCodeByError(error);
    response.sendStatus(status);
  }
});

export default ServicesRouter;