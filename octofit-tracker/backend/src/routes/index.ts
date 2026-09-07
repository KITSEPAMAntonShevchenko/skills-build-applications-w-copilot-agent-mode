import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-api',
  });
});

apiRouter.get('/', (_request, response) => {
  response.json({
    service: 'octofit-api',
    version: '1.0.0',
    endpoints: ['/api/health'],
  });
});

export default apiRouter;