import NodeCache from 'node-cache';
import { logger } from '../utils/logger.js';

const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL) || 600, // 10 minutes
  checkperiod: parseInt(process.env.CACHE_CHECK_PERIOD) || 120 // 2 minutes
});

export const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests or authenticated routes
    if (req.method !== 'GET' || req.headers.authorization) {
      return next();
    }

    const key = `__express__${req.originalUrl}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      logger.debug(`Cache hit for ${key}`);
      return res.json(cachedResponse);
    }

    const originalJson = res.json;
    res.json = (body) => {
      originalJson.call(res, body);
      cache.set(key, body, duration);
      logger.debug(`Cache set for ${key}`);
    };

    next();
  };
};