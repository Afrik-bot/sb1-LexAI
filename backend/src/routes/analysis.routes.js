import { Router } from 'express';
import { body } from 'express-validator';
import { getAnalyses, getAnalysis, createAnalysis, updateAnalysis, deleteAnalysis } from '../controllers/analysis.controller.js';
import { auth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

export function setupAnalysisRoutes(router) {
  const analysisRouter = Router();

  analysisRouter.get('/', getAnalyses);
  analysisRouter.get('/:id', getAnalysis);
  
  analysisRouter.post('/',
    auth,
    requireRole(['admin', 'expert']),
    [
      body('title').trim().notEmpty(),
      body('content').trim().notEmpty(),
      body('summary').trim().notEmpty(),
      body('topics').isArray().notEmpty(),
      validate
    ],
    createAnalysis
  );

  analysisRouter.put('/:id',
    auth,
    requireRole(['admin', 'expert']),
    [
      body('title').optional().trim().notEmpty(),
      body('content').optional().trim().notEmpty(),
      body('summary').optional().trim().notEmpty(),
      body('topics').optional().isArray(),
      body('status').optional().isIn(['draft', 'review', 'published']),
      validate
    ],
    updateAnalysis
  );

  analysisRouter.delete('/:id',
    auth,
    requireRole(['admin']),
    deleteAnalysis
  );

  router.use('/analysis', analysisRouter);
}