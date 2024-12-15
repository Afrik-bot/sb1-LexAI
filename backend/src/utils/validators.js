import { body } from 'express-validator';

export const updateValidators = {
  create: [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('summary').trim().notEmpty().withMessage('Summary is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').isIn(['legislation', 'court', 'policy', 'ethics', 'compliance'])
      .withMessage('Invalid category'),
    body('region').isIn(['us', 'eu', 'cn']).withMessage('Invalid region'),
    body('source').trim().notEmpty().withMessage('Source is required'),
    body('sourceUrl').isURL().withMessage('Valid source URL is required')
  ],
  update: [
    body('title').optional().trim().notEmpty(),
    body('summary').optional().trim().notEmpty(),
    body('content').optional().trim().notEmpty(),
    body('category').optional()
      .isIn(['legislation', 'court', 'policy', 'ethics', 'compliance']),
    body('region').optional().isIn(['us', 'eu', 'cn']),
    body('source').optional().trim().notEmpty(),
    body('sourceUrl').optional().isURL()
  ]
};

export const analysisValidators = {
  create: [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('summary').trim().notEmpty().withMessage('Summary is required'),
    body('topics').isArray().notEmpty().withMessage('At least one topic is required')
  ],
  update: [
    body('title').optional().trim().notEmpty(),
    body('content').optional().trim().notEmpty(),
    body('summary').optional().trim().notEmpty(),
    body('topics').optional().isArray(),
    body('status').optional().isIn(['draft', 'review', 'published'])
  ]
};