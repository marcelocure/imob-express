import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

// JWT configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  issuer: process.env.JWT_ISSUER || 'imob-express',
  audience: process.env.JWT_AUDIENCE || 'imob-express-users'
};

// JWT token generation
export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  } as jwt.SignOptions);
};

// JWT token verification
export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, jwtConfig.secret, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience
    }) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
