# Debug Configuration Guide

This guide explains how to debug your Express.js application using various methods and tools.

## 🚀 Quick Start

### VS Code Debugging
1. **Set breakpoints** in your code by clicking in the gutter
2. **Press F5** or go to Run & Debug panel
3. **Select "Debug Express App"** from the dropdown
4. **Click the play button** to start debugging

### Command Line Debugging
```bash
# Start with debug inspector
npm run debug

# Start with debug inspector and break on start
npm run debug:break

# Start with nodemon and debug inspector
npm run debug:dev

# Run debug helper script
npm run debug:helper
```

## 🔧 Debug Configurations

### 1. Debug Express App
- **Type**: Launch
- **Description**: Debug the main application
- **Features**: 
  - Automatic restart on file changes
  - Integrated terminal
  - Skip node internals

### 2. Debug Express App (Nodemon)
- **Type**: Launch with Nodemon
- **Description**: Debug with auto-restart on file changes
- **Features**: 
  - Hot reloading
  - Debug inspector enabled
  - Perfect for development

### 3. Debug Current File
- **Type**: Launch
- **Description**: Debug the currently open file
- **Features**: 
  - Quick debugging of individual files
  - Useful for testing utilities

### 4. Attach to Process
- **Type**: Attach
- **Description**: Attach to a running Node.js process
- **Features**: 
  - Debug already running applications
  - Remote debugging support

## 🐛 Debug Features

### Enhanced Logging
The application includes comprehensive logging with different levels:

```javascript
const { logger } = require('./utils/debug');

// Different log levels
logger.info('Application started', { port: 3000 });
logger.warn('Deprecated API used', { endpoint: '/old-api' });
logger.error('Database connection failed', error);
logger.debug('Request processed', { method: 'GET', url: '/api/users' });
```

### Debug Namespaces
Use environment variables to control debug output:

```bash
# Show all debug messages
DEBUG=app:* npm start

# Show only route debug messages
DEBUG=app:routes npm start

# Show only middleware debug messages
DEBUG=app:middleware npm start

# Show only database debug messages
DEBUG=app:database npm start

# Show only authentication debug messages
DEBUG=app:auth npm start

# Show only error debug messages
DEBUG=app:error npm start
```

### Performance Monitoring
Built-in performance monitoring:

```javascript
const { performanceMonitor } = require('./utils/debug');

// Time an operation
const perf = performanceMonitor.start('Database Query');
// ... perform operation
perf.end(); // Logs the duration
```

### Memory Monitoring
Automatic memory usage monitoring in development:

```javascript
const { memoryMonitor } = require('./utils/debug');

// Log current memory usage
memoryMonitor();
```

## 🛠 Debug Scripts

### Available NPM Scripts

| Script | Description | Use Case |
|--------|-------------|----------|
| `npm run debug` | Start with debug inspector | General debugging |
| `npm run debug:break` | Start with debug inspector and break on start | Debug startup issues |
| `npm run debug:dev` | Start with nodemon and debug inspector | Development with hot reload |
| `npm run debug:attach` | Start with remote debug inspector | Remote debugging |
| `npm run debug:helper` | Run debug helper script | Show debug information |

### Debug Helper Script
Run `npm run debug:helper` to see:
- Environment information
- Memory usage
- Performance test
- Available debug namespaces
- Usage examples

## 🔍 Debugging Techniques

### 1. Setting Breakpoints
- **Click in the gutter** next to line numbers
- **Use `debugger;` statement** in code
- **Set conditional breakpoints** (right-click on breakpoint)

### 2. Inspecting Variables
- **Hover over variables** to see values
- **Use the Variables panel** in VS Code
- **Add variables to Watch panel** for continuous monitoring

### 3. Call Stack
- **View call stack** in the Call Stack panel
- **Navigate between stack frames** to inspect different scopes
- **See the execution path** that led to current breakpoint

### 4. Console Debugging
- **Use `console.log()`** for quick debugging
- **Use `console.table()`** for object inspection
- **Use `console.time()` and `console.timeEnd()`** for timing

### 5. Network Debugging
- **Use browser dev tools** for API testing
- **Check request/response headers** and bodies
- **Monitor network timing** and performance

## 🚨 Common Debug Scenarios

### 1. API Endpoint Not Working
```javascript
// Add debug logging to routes
app.get('/api/users', (req, res) => {
  logger.debug('GET /api/users called', { query: req.query });
  // ... route logic
});
```

### 2. Middleware Issues
```javascript
// Add debug logging to middleware
const authMiddleware = (req, res, next) => {
  logger.debug('Auth middleware called', { 
    headers: req.headers,
    user: req.user 
  });
  next();
};
```

### 3. Database Connection Problems
```javascript
// Add debug logging to database operations
const connectDB = async () => {
  try {
    logger.debug('Connecting to database', { host: config.host });
    // ... connection logic
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Database connection failed', error);
  }
};
```

### 4. Performance Issues
```javascript
// Use performance monitoring
const processRequest = async (req, res) => {
  const perf = performanceMonitor.start('Request Processing');
  
  try {
    // ... processing logic
    perf.end();
  } catch (error) {
    perf.end();
    throw error;
  }
};
```

## 📊 Debug Output Examples

### Development Mode
When `NODE_ENV=development`, you'll see:
```
[INFO] 2024-01-15T10:30:00.000Z - Starting Express application { port: 3000, nodeEnv: 'development' }
[DEBUG] Incoming request { method: 'GET', url: '/api/users', headers: {...} }
[ROUTE] GET /api/users { query: {} }
[DEBUG] Request completed { method: 'GET', url: '/api/users', status: 200, duration: '15ms' }
```

### Production Mode
In production, only errors and important messages are logged:
```
[INFO] 2024-01-15T10:30:00.000Z - Server is running on port 3000
[ERROR] 2024-01-15T10:35:00.000Z - Unhandled error occurred { message: 'Database connection failed' }
```

## 🎯 Best Practices

1. **Use appropriate log levels** (info, warn, error, debug)
2. **Include context** in log messages
3. **Use structured logging** with objects
4. **Set breakpoints strategically** at key decision points
5. **Use conditional breakpoints** for specific scenarios
6. **Monitor memory usage** in long-running applications
7. **Test error scenarios** with debug logging
8. **Use performance monitoring** for optimization

## 🔗 Additional Resources

- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Express.js Debugging](https://expressjs.com/en/guide/debugging.html)
- [Debug Module Documentation](https://www.npmjs.com/package/debug)

Happy debugging! 🐛✨
