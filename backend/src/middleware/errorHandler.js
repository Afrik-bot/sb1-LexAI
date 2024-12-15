import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  // Log the full error in development
  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
  }

  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Only send detailed error info in development
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err.details || undefined
    })
  });
}