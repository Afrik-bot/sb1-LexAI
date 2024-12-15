import { Router } from 'express';
import { setupAuthRoutes } from './auth.routes.js';
import { setupUpdateRoutes } from './updates.routes.js';
import { setupAnalysisRoutes } from './analysis.routes.js';
import { setupDocsRoutes } from './docs.routes.js';

export function setupRoutes(app) {
  const router = Router();
  
  setupAuthRoutes(router);
  setupUpdateRoutes(router);
  setupAnalysisRoutes(router);
  setupDocsRoutes(router);
  
  app.use('/api', router);
}