import express from 'express';
import { apiBaseUrl, apiPort } from './config/api.js';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

export const app = express();

app.use(express.json());
app.use('/api', apiRouter);

async function startServer() {
  await connectDatabase();
  app.listen(apiPort, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  });
}