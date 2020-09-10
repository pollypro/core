import { Request, Response, Router } from 'express';
import { runCommand } from '../utils/commands';
import CreateCompany from '../commands/companies/CreateCompany';
import ListCompanies from '../commands/companies/ListCompanies';
import DeleteCompany from '../commands/companies/DeleteCompany';
import UpdateCompany from '../commands/companies/UpdateCompany';
import verifyToken from '../middlewares/verifyToken';
import { httpCodeByError } from '../utils/http';

const CompaniesRouter = Router();

CompaniesRouter.post(
  '/create-company',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(CreateCompany, {}, request.body);
      response.status(200).json(context.company);
    } catch (e) {
      console.log(e);
    }
  },
);

CompaniesRouter.post(
  '/list-companies',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      const context = await runCommand(ListCompanies, {}, request.body);
      response.status(200).json(context.companies);
    } catch (e) {
      console.log(e);
    }
  },
);

CompaniesRouter.post(
  '/delete-company',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(DeleteCompany, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

CompaniesRouter.post(
  '/update-company',
  verifyToken,
  async (request: Request, response: Response) => {
    try {
      await runCommand(UpdateCompany, {}, request.body);
      response.status(204).send();
    } catch (error) {
      const status = httpCodeByError(error);
      response.sendStatus(status);
    }
  },
);

export default CompaniesRouter;
