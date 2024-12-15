export const DATABASE = {
  STATES: {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3
  },
  TIMEOUT: {
    connection: 10000,
    operation: 5000
  }
};

export const AUTH = {
  TOKEN_EXPIRY: '7d',
  PASSWORD_MIN_LENGTH: 8,
  SALT_ROUNDS: 12
};

export const API = {
  VERSIONS: ['v1'],
  DEFAULT_VERSION: 'v1',
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  }
};