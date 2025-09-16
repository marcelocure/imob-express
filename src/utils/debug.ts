import debug from 'debug';
import { Request, Response, NextFunction } from 'express';

// Create debug namespaces
const debugApp = debug('app:main');
const debugRoutes = debug('app:routes');
const debugMiddleware = debug('app:middleware');
const debugDatabase = debug('app:database');
const debugAuth = debug('app:auth');
const debugError = debug('app:error');

// Enhanced logging utility
export const logger = {
  info: (message: string, data: any = {}): void => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
    debugApp(message, data);
  },
  
  warn: (message: string, data: any = {}): void => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
    debugApp(message, data);
  },
  
  error: (message: string, error: any = {}): void => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
    debugError(message, error);
  },
  
  debug: (message: string, data: any = {}): void => {
    debugApp(message, data);
  },
  
  route: (method: string, path: string, data: any = {}): void => {
    console.log(`[ROUTE] ${method.toUpperCase()} ${path}`, data);
    debugRoutes(`${method.toUpperCase()} ${path}`, data);
  },
  
  middleware: (name: string, data: any = {}): void => {
    console.log(`[MIDDLEWARE] ${name}`, data);
    debugMiddleware(name, data);
  },
  
  database: (operation: string, data: any = {}): void => {
    console.log(`[DATABASE] ${operation}`, data);
    debugDatabase(operation, data);
  },
  
  auth: (action: string, data: any = {}): void => {
    console.log(`[AUTH] ${action}`, data);
    debugAuth(action, data);
  }
};

// Request timing middleware
export const requestTimer = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.debug(`Request completed`, {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
};

// Debug middleware for request/response logging
export const debugRequest = (req: Request, res: Response, next: NextFunction): void => {
  logger.debug('Incoming request', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    query: req.query,
    params: req.params
  });
  
  next();
};

// Performance monitoring
export const performanceMonitor = {
  start: (label: string) => {
    const start = process.hrtime.bigint();
    return {
      end: (): number => {
        const end = process.hrtime.bigint();
        const duration = Number(end - start) / 1000000; // Convert to milliseconds
        logger.debug(`Performance: ${label}`, { duration: `${duration.toFixed(2)}ms` });
        return duration;
      }
    };
  }
};

// Memory usage monitor
export const memoryMonitor = (): void => {
  const usage = process.memoryUsage();
  logger.debug('Memory usage', {
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`
  });
};

// Error context helper
export const errorContext = (error: Error, req: Request | null = null): any => {
  const context: any = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  };
  
  if (req) {
    context.request = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params
    };
  }
  
  return context;
};

export const debugNamespaces = {
  app: debugApp,
  routes: debugRoutes,
  middleware: debugMiddleware,
  database: debugDatabase,
  auth: debugAuth,
  error: debugError
};
