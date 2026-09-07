import { Router } from 'express';
import { Activity, User } from '../models/index.js';
import { apiBaseUrl } from '../config/api.js';

const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-api',
    baseUrl: apiBaseUrl,
  });
});

apiRouter.get('/users', async (_request, response, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ displayName: 1 }).lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (_request, response, next) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username displayName')
      .sort({ completedAt: -1 })
      .lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/', (_request, response) => {
  response.json({
    service: 'octofit-api',
    version: '1.0.0',
    baseUrl: apiBaseUrl,
    endpoints: ['/api/health', '/api/users', '/api/activities'],
  });
});

export default apiRouter;