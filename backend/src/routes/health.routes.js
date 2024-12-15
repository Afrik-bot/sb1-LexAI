import { Router } from 'express';
import { checkDatabaseConnection, getDatabaseStatus } from '../utils/database.js';

export function setupHealthRoutes(app) {
  const healthRouter = Router();

  healthRouter.get('/ip', (req, res) => {
    res.json({
      ip: req.ip,
      forwarded: req.headers['x-forwarded-for'] || null
    });
  });

  healthRouter.get('/health', async (req, res) => {
    const dbConnected = await checkDatabaseConnection();
    const dbStatus = getDatabaseStatus();
    
    const health = {
      status: dbConnected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbConnected,
        state: dbStatus.state,
        host: dbStatus.host
      },
      uptime: process.uptime()
    };

    res.status(dbConnected ? 200 : 503).json(health);
  });

  app.use('/', healthRouter);
}