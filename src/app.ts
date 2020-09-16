import { config as configEnv } from 'dotenv-safe';
configEnv();

// imports from vendors
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import httpContext from 'express-http-context';
import morgan from 'morgan';

// imports from routes
import AuthRouter from './routes/auth';
import CompaniesRouter from './routes/companies';
import PingRouter from './routes/ping';
import ServicesRouter from './routes/services';
import UsersRouter from './routes/users';

// imports from utils
import { runApp } from './utils/server';
import { getConnection } from './utils/mongodb';

// Initial MongoDB connection establishment
getConnection();

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('tiny'));
app.use(httpContext.middleware);
app.disable('x-powered-by');

app.use('/auth', AuthRouter);
app.use('/companies', CompaniesRouter);
app.use('/ping', PingRouter);
app.use('/services', ServicesRouter);
app.use('/users', UsersRouter);

runApp(app);
