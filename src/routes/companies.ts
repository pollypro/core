import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CreateCompany from '../commands/companies/CreateCompany';
import verifyToken from '../middlewares/verifyToken';

const CompaniesRouter = Router();

CompaniesRouter.post('/create-company', verifyToken, async (request: Request, response: Response) => {
  try {
    const context = await runCommand(CreateCompany, {}, request.body);
    response.status(200).json({ company: context.company });
  } catch (e) {
    console.log(e);
  }
});

export default CompaniesRouter;
