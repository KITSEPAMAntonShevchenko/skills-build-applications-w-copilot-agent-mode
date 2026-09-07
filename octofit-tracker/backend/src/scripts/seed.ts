import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Replace the demo dataset in octofit_db with a consistent OctoFit sample.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Leaderboard.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
    ]);

    const [paul, maya, jordan] = await User.create([
      {
        username: 'paul.octo',
        email: 'paul.octo@mergington.edu',
        displayName: 'Paul Octo',
        passwordHash: 'demo-password-hash',
        fitnessLevel: 'intermediate',
      },
      {
        username: 'maya.chen',
        email: 'maya.chen@mergington.edu',
        displayName: 'Maya Chen',
        passwordHash: 'demo-password-hash',
        fitnessLevel: 'beginner',
      },
      {
        username: 'jordan.lee',
        email: 'jordan.lee@mergington.edu',
        displayName: 'Jordan Lee',
        passwordHash: 'demo-password-hash',
        fitnessLevel: 'advanced',
      },
    ]);

    const team = await Team.create({
      name: 'OctoFit Trailblazers',
      description: 'A welcoming team building consistent movement habits together.',
      members: [paul._id, maya._id, jordan._id],
      totalPoints: 325,
    });

    await Activity.create([
      { user: maya._id, type: 'walking', durationMinutes: 35, distanceKm: 2.8, points: 40, completedAt: new Date('2026-09-01T16:30:00Z') },
      { user: jordan._id, type: 'running', durationMinutes: 28, distanceKm: 5.1, points: 115, completedAt: new Date('2026-09-02T07:15:00Z') },
      { user: paul._id, type: 'strength', durationMinutes: 42, points: 90, completedAt: new Date('2026-09-03T15:45:00Z') },
    ]);

    await Leaderboard.create([
      { user: jordan._id, team: team._id, period: '2026-09', points: 115, rank: 1 },
      { user: paul._id, team: team._id, period: '2026-09', points: 90, rank: 2 },
      { user: maya._id, team: team._id, period: '2026-09', points: 40, rank: 3 },
    ]);

    await Workout.create([
      {
        user: maya._id,
        title: 'First-Step Cardio',
        description: 'A gentle session to build confidence and consistency.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Warm-up walk', 'Brisk walk intervals', 'Cool-down stretch'],
      },
      {
        user: jordan._id,
        title: 'Speed and Strength',
        description: 'A focused circuit for an experienced athlete.',
        difficulty: 'advanced',
        durationMinutes: 35,
        exercises: ['Dynamic warm-up', 'Hill sprints', 'Bodyweight circuit', 'Mobility cooldown'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
