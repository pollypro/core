import { config as configEnv } from 'dotenv-safe';
configEnv();

// imports from vendors
import express from 'express';
import cors from 'cors';

// imports from routes
import PingRouter from './routes/ping';

// imports from utils
import { runApp } from './utils/server';
import { getConnection } from './utils/mongodb';

// Initial MongoDB connection establishment
getConnection();

const app = express();

app.use(cors());
app.disable('x-powered-by');

app.use('/ping', PingRouter);

runApp(app);
