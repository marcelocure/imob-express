# Imob Express

A basic Express.js application structure for a real estate management system.

## Features

- **Express.js** web framework
- **Modular structure** with separate routes, middleware, and models
- **Security middleware** (Helmet, CORS)
- **Request logging** with Morgan
- **Environment configuration** with dotenv
- **Error handling** middleware
- **Input validation** middleware
- **Authentication** middleware (basic JWT structure)
- **Static file serving**
- **API endpoints** for customers

## Project Structure

```
imob-express/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── routes/               # Route handlers
│   ├── index.js          # Main routes
│   └── api.js            # API routes
├── middleware/           # Custom middleware
│   ├── auth.js           # Authentication
│   ├── validation.js     # Input validation
│   └── errorHandler.js   # Error handling
├── models/               # Data models
│   └── Customer.js       # Customer model
├── config/               # Configuration files
│   ├── index.js          # Main config
│   ├── database.js       # Database config
│   └── jwt.js            # JWT config
├── public/               # Static files
│   ├── css/
│   │   └── style.css     # Styles
│   └── js/
│       └── app.js        # Client-side JS
└── views/                # Templates
    └── index.html        # Main page
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev
```

4. Or start the production server:
```bash
npm start
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (not implemented yet)

## API Endpoints

### Main Routes
- `GET /` - Welcome message
- `GET /health` - Health check

### API Routes
- `GET /api` - API information
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `GET /api/health` - Database health check

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=imob_express
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# API Configuration
API_VERSION=v1
```

## Development

This is a basic structure that can be extended with:

- Real authentication with JWT
- File upload handling
- Email services
- Testing framework
- API documentation
- Docker configuration
- CI/CD pipeline

## License

ISC
