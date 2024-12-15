import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { createRateLimiter } from './middleware/rateLimiter.js';
import { setupRoutes } from './routes/index.js';
import { setupHealthRoutes } from './routes/health.routes.js';
import { connectDB } from './config/database.js';
import { logger } from './utils/logger.js';

dotenv.config();

// Ensure required environment variables are set
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const app = express();

// Security and monitoring middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4321'
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use(requestLogger);
app.use(createRateLimiter());

setupHealthRoutes(app);  // This sets up /health and /ip endpoints
setupRoutes(app);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api/docs`);
      logger.info(`Health check available at http://localhost:${PORT}/health`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', {
      error: error.message,
      code: error.code,
      name: error.name
    });
    process.exit(1);
  }
}

startServer();