# Imob Express

A modern, type-safe Express.js application for real estate management, built with TypeScript and featuring comprehensive validation, authentication, and database integration.

## 🚀 Features

### Core Technologies
- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure token-based authentication
- **Zod Validation** - Runtime type validation and parsing

### Security & Middleware
- **Helmet** - Security headers protection
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging
- **Custom Authentication** - JWT-based auth middleware
- **Input Validation** - Request validation with Zod schemas
- **Error Handling** - Comprehensive error management

### Development Experience
- **Hot Reload** - Development server with automatic restarts
- **Source Maps** - Enhanced debugging experience
- **Path Mapping** - Clean imports with `@/` aliases
- **Strict TypeScript** - Maximum type safety
- **Debug Utilities** - Advanced logging and monitoring

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation
```
npm install
```

2. **Environment configuration:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development server:**
```bash
npm run dev
```

4. **Or build and run production:**
```bash
npm run build
npm start
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm run clean` | Remove compiled files |
| `npm run debug` | Start with debugging enabled |

## 🔌 API Endpoints

### Authentication
- `POST /auth/token` - Generate JWT token
  ```json
  {
    "userName": "admin",
    "password": "admin"
  }
  ```

### Customer Management
- `GET /customers` - Get all active customers
- `GET /customers/:id` - Get customer by ID
- `POST /customers` - Create new customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Soft delete customer
- `DELETE /customers/:id?deletionType=hard` - Hard delete customer

### System
- `GET /` - Welcome message and API info
- `GET /health` - System health check

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
NODE_ENV
PORT
API_VERSION

# Database Configuration
MONGODB_URI

# JWT Configuration
JWT_SECRET
JWT_EXPIRES_IN
JWT_ISSUER
JWT_AUDIENCE

# CORS Configuration
CORS_ORIGIN
```

## 🏗️ TypeScript Features

### Type Safety
- **Strict Mode**: Maximum type checking enabled
- **Interface Definitions**: Comprehensive type definitions for all data structures
- **Generic Types**: Reusable type patterns for API responses
- **Mongoose Integration**: Full typing for database models

### Development Tools
- **Path Mapping**: Use `@/` for clean imports
- **Source Maps**: Enhanced debugging experience
- **Declaration Files**: Generated `.d.ts` files for better IDE support

## 🔐 Authentication

The application uses JWT-based authentication with the following flow:

1. **Login**: POST to `/auth/token` with credentials
2. **Token**: Receive JWT token in response
3. **Authorization**: Include token in `Authorization: Bearer <token>` header
4. **Protection**: All routes except `/auth/token` require authentication


## 🚦 Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Zod schema validation with detailed error messages
- **Database Errors**: Mongoose validation and duplicate key handling
- **JWT Errors**: Token expiration and invalid token handling
- **HTTP Errors**: Standard HTTP status codes with meaningful messages


## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🧪 Testing

Testing framework setup (ready for implementation):
- Unit tests for models and utilities
- Integration tests for API endpoints
- End-to-end tests for complete workflows

## 📈 Performance Features

- **Connection Pooling**: Optimized MongoDB connections
- **Request Timing**: Performance monitoring middleware
- **Memory Monitoring**: Development memory usage tracking
- **Error Context**: Detailed error logging with request context

## 🔄 Migration from JavaScript

This project was successfully migrated from JavaScript to TypeScript, including:

- ✅ All source files converted to `.ts`
- ✅ Type definitions created for all interfaces
- ✅ Strict TypeScript configuration
- ✅ Build pipeline with compilation
- ✅ Development server with hot reload
- ✅ Path mapping for clean imports
- ✅ Full type safety across the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript typing
4. Add tests for new functionality
5. Submit a pull request

---

**Built using TypeScript, Express.js, and MongoDB**