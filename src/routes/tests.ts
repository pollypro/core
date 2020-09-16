import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CreateTest from '../commands/tests/CreateTest';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const TestsRouter = Router();

TestsRouter.post('/create-test', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(CreateTest, {}, request.body);
    response.status(200).json(context.test);
  } catch (error) {
    const status = httpCodeByError(error);
    response.sendStatus(status);
  }
});

export default TestsRouter;
