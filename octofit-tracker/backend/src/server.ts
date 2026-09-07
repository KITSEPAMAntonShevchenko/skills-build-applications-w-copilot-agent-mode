import express from 'express';
import cors from 'cors';
import { apiBaseUrl, apiPort } from './config/api.js';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

const codespaceName = process.env.CODESPACE_NAME;
const advertisedApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : apiBaseUrl;

async function startServer() {
  await connectDatabase();
  app.listen(apiPort, () => {
    console.log(`OctoFit API listening at ${advertisedApiUrl}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  });
}