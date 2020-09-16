import { Request, Response, Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';
import { runCommand } from '../utils/commands';
import CreateQuestion from '../commands/questions/CreateQuestion';

const QuestionsRouter = Router();

QuestionsRouter.post(
  '/create-question',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(CreateQuestion, {}, request.body);
      response.status(200).json(context.question);
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

export default QuestionsRouter;
