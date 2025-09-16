import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

// Extend Express Request interface to include user
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

// JWT Payload interface
export interface JWTPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

// Customer interface
export interface ICustomer extends Document {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  fullProfile: ICustomer;
}

// Customer creation/update interface
export interface CustomerInput {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Middleware type
export type MiddlewareFunction = (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Promise<void>;

// Route handler type
export type RouteHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Promise<void>;

// Database health check interface
export interface DatabaseHealth {
  status: 'connected' | 'disconnected' | 'error';
  message?: string;
  timestamp?: Date;
}

// Environment variables interface
export interface EnvironmentConfig {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_ISSUER: string;
  JWT_AUDIENCE: string;
  API_VERSION: string;
}
