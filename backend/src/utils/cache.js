import NodeCache from 'node-cache';
import { logger } from './logger.js';

const cache = new NodeCache({
  stdTTL: 600, // 10 minutes
  checkperiod: 120 // Check for expired entries every 2 minutes
});

export const cacheMiddleware = (duration = 600) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
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