import express, { Response } from 'express';
import { AuthenticatedRequest, RouteHandler } from '../types';

const router = express.Router();

// Home route
router.get('/', (async (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'Welcome to Imob Express API',
    version: process.env.API_VERSION || 'v1',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      customers: '/api/customers',
      auth: '/api/auth',
      health: '/health'
    }
  });
}) as RouteHandler);

// Health check route
router.get('/health', (async (req: AuthenticatedRequest, res: Response) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}) as RouteHandler);

export default router;
