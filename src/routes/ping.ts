import { Request, Response, Router } from 'express';

const PingRouter = Router();

PingRouter.get('/', (request: Request, response: Response) => {
  response.send('I am alive');
});

export default PingRouter;
