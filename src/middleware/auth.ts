import { Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { AuthenticatedRequest, MiddlewareFunction } from '../types';

// Authentication middleware
export const authenticateToken: MiddlewareFunction = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.path === '/auth/token') {
    next();
    return;
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
};

export const requireAuth: MiddlewareFunction = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
};
