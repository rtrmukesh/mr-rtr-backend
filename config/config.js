require('dotenv').config();

module.exports = {
  development: {
    // If DATABASE_URL is defined, use it; otherwise, fall back to individual variables.
    ...(process.env.DATABASE_URL
      ? {
          use_env_variable: 'DATABASE_URL',
          dialect: 'postgres',
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Adjust as needed for SSL settings
            },
          },
        }
      : {
          username: process.env.DB_USER || 'defaultUser',
          password: process.env.DB_PASSWORD || 'defaultPassword',
          database: process.env.DB_NAME || 'defaultDatabase',
          host: process.env.DB_HOST || 'localhost',
          dialect: process.env.DB_DIALECT || 'postgres',
          port: process.env.DB_PORT || 5432,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
        }),
  },
};
