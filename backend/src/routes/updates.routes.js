import { Router } from 'express';
import { body } from 'express-validator';
import { getUpdates, getUpdate, createUpdate, updateUpdate, deleteUpdate } from '../controllers/updates.controller.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { paginationMiddleware } from '../middleware/pagination.js';
import { auth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

export function setupUpdateRoutes(router) {
  const updatesRouter = Router();

  updatesRouter.get('/',
    paginationMiddleware(10, 50),
    cacheMiddleware(300), // Cache for 5 minutes
    getUpdates
  );
  
  updatesRouter.get('/:id',
    cacheMiddleware(300),
    getUpdate
  );
  
  updatesRouter.post('/',
    auth,
    requireRole(['admin', 'expert']),
    [
      body('title').trim().notEmpty(),
      body('summary').trim().notEmpty(),
      body('content').trim().notEmpty(),
      body('category').isIn(['legislation', 'court', 'policy', 'ethics', 'compliance']),
      body('region').isIn(['us', 'eu', 'cn']),
      body('source').trim().notEmpty(),
      body('sourceUrl').isURL(),
      validate
    ],
    createUpdate
  );

  updatesRouter.put('/:id',
    auth,
    requireRole(['admin', 'expert']),
    [
      body('title').optional().trim().notEmpty(),
      body('summary').optional().trim().notEmpty(),
      body('content').optional().trim().notEmpty(),
      body('category').optional().isIn(['legislation', 'court', 'policy', 'ethics', 'compliance']),
      body('region').optional().isIn(['us', 'eu', 'cn']),
      body('source').optional().trim().notEmpty(),
      body('sourceUrl').optional().isURL(),
      validate
    ],
    updateUpdate
  );

  updatesRouter.delete('/:id',
    auth,
    requireRole(['admin']),
    deleteUpdate
  );

  router.use('/updates', updatesRouter);
}