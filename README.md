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

## 📁 Project Structure

```
src/
├── app.ts                 # Main application entry point
├── config/                # Configuration files
│   ├── index.ts          # Main configuration
│   ├── database.ts       # Database configuration
│   ├── mongodb.ts        # MongoDB connection management
│   └── jwt.ts            # JWT configuration
├── middleware/           # Express middleware
│   ├── auth.ts           # Authentication middleware
│   ├── errorHandler.ts   # Error handling middleware
│   └── validation.ts     # Input validation middleware
├── models/               # Mongoose data models
│   └── Customer.ts       # Customer model with full typing
├── routes/               # API route handlers
│   ├── index.ts          # Main routes
│   ├── auth.ts           # Authentication routes
│   └── customer.ts       # Customer CRUD operations
├── types/                # TypeScript type definitions
│   └── index.ts          # Shared interfaces and types
└── utils/                # Utility functions
    └── debug.ts          # Logging and debugging utilities

dist/                     # Compiled JavaScript output
public/                   # Static files
├── css/
│   └── style.css
├── js/
│   └── app.js
└── views/
    └── index.html
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd imob-express
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
NODE_ENV=development
PORT=8080
API_VERSION=v1

# Database Configuration
MONGODB_URI=mongodb://user1:pwd1@localhost:2701/imob_express_dev?authSource=imob_express_dev

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
JWT_ISSUER=imob-express
JWT_AUDIENCE=imob-express-users

# CORS Configuration
CORS_ORIGIN=*
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

### Example Type Definitions
```typescript
interface ICustomer extends Document {
  _id: string;
  document: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  isActive: boolean;
  profile: {
    phone?: string;
    avatar?: string;
    bio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Authentication

The application uses JWT-based authentication with the following flow:

1. **Login**: POST to `/auth/token` with credentials
2. **Token**: Receive JWT token in response
3. **Authorization**: Include token in `Authorization: Bearer <token>` header
4. **Protection**: All routes except `/auth/token` require authentication

## 📊 Database Schema

### Customer Model
```typescript
{
  document: string,        // Unique 11-character document
  name: string,           // Customer name (2-50 chars)
  email: string,          // Unique email address
  role: 'admin' | 'agent', // User role
  isActive: boolean,      // Soft delete flag
  profile: {
    phone?: string,       // Optional phone number
    avatar?: string,      // Optional avatar URL
    bio?: string          // Optional bio (max 500 chars)
  },
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🚦 Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Zod schema validation with detailed error messages
- **Database Errors**: Mongoose validation and duplicate key handling
- **JWT Errors**: Token expiration and invalid token handling
- **HTTP Errors**: Standard HTTP status codes with meaningful messages

## 🔍 Validation

Input validation is handled using Zod schemas:

```typescript
const CustomerInput = z.object({
  document: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'agent']).optional(),
  isActive: z.boolean().optional(),
  profile: z.object({
    phone: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
  }).optional(),
});
```

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

## 📄 License

ISC License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the existing issues
- Create a new issue with detailed description
- Include error logs and environment details

---

**Built with ❤️ using TypeScript, Express.js, and MongoDB**