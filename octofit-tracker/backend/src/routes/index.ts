import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
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

apiRouter.get('/teams', async (_request, response, next) => {
  try {
    const teams = await Team.find().populate('members', 'username displayName').sort({ totalPoints: -1 }).lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    const entries = await Leaderboard.find()
      .populate('user', 'username displayName')
      .populate('team', 'name')
      .sort({ period: -1, rank: 1 })
      .lean();
    response.json(entries);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (_request, response, next) => {
  try {
    const workouts = await Workout.find()
      .populate('user', 'username displayName')
      .sort({ createdAt: -1 })
      .lean();
    response.json(workouts);
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