import express, { Response, Request } from 'express';
import { logger } from '../utils/debug';
import { generateToken } from '../config/jwt';
import { AuthenticatedRequest, RouteHandler } from '../types';
import { z } from 'zod';

const router = express.Router();

router.post('/token', (async (req: AuthenticatedRequest, res: Response) => {
  try {

    const AuthInput = z.object({
      userName: z.string(),
      password: z.string()
    });
    
    // Usage in an API request
    const parsed = AuthInput.parse(req.body);

    if (parsed.userName === 'admin' && parsed.password === 'admin') {
      const token = generateToken({ id: '1', email: 'admin@example.com' });
      res.status(201).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    logger.error('Error authenticating user', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({error: JSON.parse(error.message)});
      return;
    }
    
    res.status(500).json({
      error: 'Failed to authenticate user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RouteHandler);

export default router;
