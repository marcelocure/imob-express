import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

interface ErrorWithStatus extends Error {
  status?: number;
  code?: number;
  errors?: { [key: string]: { message: string } };
}

interface ErrorResponse {
  message: string;
  status: number;
  details?: string | string[];
  stack?: string;
}

// Error handling middleware
export const errorHandler = (
  err: ErrorWithStatus,
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Default error
  let error: ErrorResponse = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = err.errors ? Object.values(err.errors).map(val => val.message) : ['Validation failed'];
    error = {
      message: 'Validation Error',
      status: 400,
      details: messages
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error = {
      message: 'Duplicate field value',
      status: 400,
      details: 'A record with this value already exists'
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      status: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      status: 401
    };
  }

  res.status(error.status).json({
    error: error.message,
    ...(error.details && { details: error.details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 handler
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as ErrorWithStatus;
  error.status = 404;
  next(error);
};
