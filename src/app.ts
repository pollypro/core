import { config as configEnv } from 'dotenv-safe';
configEnv();

import express from 'express';
import cors from 'cors';
import { runApp } from './utils/server';

import PingRouter from './routes/ping';

const app = express();

app.use(cors());
app.disable('x-powered-by');

app.use('/ping', PingRouter);

runApp(app);
