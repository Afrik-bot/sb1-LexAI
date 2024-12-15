import mongoose from 'mongoose';
import { logger } from './logger.js';

export async function closeDatabase() {
  try {
    await mongoose.connection.close();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error);
    throw error;
  }
}

export function getDatabaseStatus() {
  return {
    state: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
}

export async function checkDatabaseConnection() {
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (error) {
    logger.error('Database ping failed:', error);
    return false;
  }
}