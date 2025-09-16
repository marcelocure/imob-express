import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authenticateToken } from './middleware/auth';

import { errorHandler, notFound } from './middleware/errorHandler';
import config from './config';

// Import debug utilities
import { logger, requestTimer, debugRequest, memoryMonitor, errorContext } from './utils/debug';

// Import MongoDB connection
import mongoDB from './config/mongodb';

// Import routes
import authRoutes from './routes/auth';
import indexRoutes from './routes/index';
import customerRoutes from './routes/customer';

dotenv.config();

const app: Application = express();

// Debug middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(debugRequest);
  app.use(requestTimer);
}

app.use(helmet()); // Security headers
app.use(authenticateToken); // Authentication middleware
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Routes
app.use('/customers', customerRoutes);
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

app.use(errorHandler);// Error handling middleware
app.use('*', notFound);



app.listen(config.port, async () => {
  logger.info(`Server is running on port ${config.port}, environment: ${config.nodeEnv}`);
  
  // Connect to MongoDB
  try {
    await mongoDB.connect();
  } catch (error) {
    logger.error('Failed to connect to database', error);
    process.exit(1);
  }
  
  // Log memory usage on startup
  // memoryMonitor();
  
  // if (process.env.NODE_ENV === 'development') {
  //   const fiveMinutes = 5 * 60 * 1000;
  //   setInterval(memoryMonitor, fiveMinutes);
  // }
});

export default app;
