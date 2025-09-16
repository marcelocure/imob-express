import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

// Validation utility functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUser = (req: Request | AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const { email, password, name } = req.body;
  const errors: string[] = [];

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
    return;
  }

  next();
};

export const validateProperty = (req: Request | AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const { title, description, price, location } = req.body;
  const errors: string[] = [];

  if (!title || title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!description || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    errors.push('Valid price is required');
  }

  if (!location || location.trim().length < 3) {
    errors.push('Location must be at least 3 characters long');
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
    return;
  }

  next();
};
