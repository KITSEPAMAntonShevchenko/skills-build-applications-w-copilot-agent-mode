import express from 'express';
import apiRouter from './routes/index.js';

export const app = express();

app.use(express.json());
app.use('/api', apiRouter);

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT) || 8000;

  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}