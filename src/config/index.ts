// Main configuration file
import dotenv from 'dotenv';
import database from './database';
import { jwtConfig } from './jwt';

dotenv.config();

export interface Config {
  port: number;
  nodeEnv: string;
  apiVersion: string;
  database: typeof database;
  jwt: typeof jwtConfig;
  cors: {
    origin: string;
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  upload: {
    maxFileSize: number;
    allowedTypes: string[];
  };
}

const config: Config = {
  // Server configuration
  port: parseInt(process.env.PORT || '8080', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API configuration
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Database configuration
  database,
  
  // JWT configuration
  jwt: jwtConfig,
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  
  // File upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  }
};

export default config;
