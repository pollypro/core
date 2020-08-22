import { config as configEnv } from 'dotenv-safe';
configEnv();

// imports from vendors
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

// imports from routes
import AuthRouter from './routes/auth';
import PingRouter from './routes/ping';

// imports from utils
import { runApp } from './utils/server';
import { getConnection } from './utils/mongodb';

// Initial MongoDB connection establishment
getConnection();

const app = express();

app.use(cors());
app.use(json());
app.disable('x-powered-by');

app.use('/auth', AuthRouter);
app.use('/ping', PingRouter);

runApp(app);
