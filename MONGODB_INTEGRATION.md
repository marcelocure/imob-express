# MongoDB Integration Guide

This guide explains the MongoDB integration with Mongoose in your Express application.

## 🚀 **What's Been Added**

### **Dependencies Installed**
- `mongoose` - MongoDB object modeling for Node.js
- `bcryptjs` - Password hashing library

### **Configuration Files**
- `config/database.js` - MongoDB connection configuration
- `config/mongodb.js` - MongoDB connection utility with health checks
- Updated `.env` with MongoDB settings

### **Models Updated**
- `models/Customer.js` - Complete Mongoose Customer schema with validation

### **Routes Enhanced**
- All API routes now use Mongoose models
- Added proper error handling and validation
- Added database health checks

## 📊 **Database Schema**

### **Customer Model**
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  role: String (enum: 'customer', 'admin', 'agent'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  profile: {
    phone: String,
    avatar: String,
    bio: String (max 500 chars)
  },
  createdAt: Date,
  updatedAt: Date
}
```


## 🔧 **API Endpoints**

### **Customers**
- `GET /api/customers` - Get all active customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer

### **Health Check**
- `GET /api/health` - Database and application health

## 🛠 **Features**

### **Customer Features**
- Email validation and uniqueness
- Role-based access (customer, admin, agent)
- Profile management
- Last login tracking


### **Database Features**
- Connection pooling
- Health monitoring
- Graceful shutdown
- Error handling
- Indexing for performance
- Validation middleware

## 🚀 **Getting Started**

### **1. Install MongoDB**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS with Homebrew
brew install mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### **2. Start MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or with Docker
docker start mongodb
```

### **3. Run the Application**
```bash
# Install dependencies
npm install

# Start the application
npm start

# Or with debug
npm run debug
```

### **4. Test the API**
```bash
# Health check
curl http://localhost:3000/api/health

# Create a customer
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"customer"}'

# Get customers
curl http://localhost:3000/api/customers
```

## 🐛 **Debugging**

### **Enable Debug Logging**
```bash
# All debug messages
DEBUG=app:* npm start

# Only database operations
DEBUG=app:database npm start

# Only route operations
DEBUG=app:routes npm start
```

### **MongoDB Compass**
Use MongoDB Compass to visually explore your data:
1. Download from https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Browse your `imob_express_dev` database

## 📈 **Performance Tips**

### **Indexes**
The models include optimized indexes for:
- Text search on properties
- Location-based queries
- User email lookups
- Property filtering

### **Connection Pooling**
- Development: 10 connections
- Test: 5 connections
- Production: 20 connections

### **Query Optimization**
- Use `.select()` to limit returned fields
- Use `.populate()` efficiently
- Implement pagination for large datasets

## 🔒 **Security Features**

### **Password Security**
- Bcrypt hashing with salt rounds of 12
- Password never returned in API responses
- Minimum 6 character requirement

### **Data Validation**
- Mongoose schema validation
- Input sanitization
- Type checking

### **Error Handling**
- No sensitive data in error messages
- Proper HTTP status codes
- Logging for debugging

## 🚨 **Common Issues**

### **Connection Issues**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check MongoDB logs
sudo journalctl -u mongod
```

### **Validation Errors**
- Check required fields
- Verify data types
- Check enum values

### **Performance Issues**
- Monitor database queries
- Check indexes
- Use pagination

## 📚 **Next Steps**

1. **Add JWT Authentication** - Implement real JWT tokens
2. **Add File Upload** - For property images
3. **Add Email Service** - For notifications
4. **Add Caching** - Redis for better performance
5. **Add Testing** - Unit and integration tests
6. **Add API Documentation** - Swagger/OpenAPI

## 🎯 **Production Checklist**

- [ ] Change JWT secret
- [ ] Use environment variables for all secrets
- [ ] Set up MongoDB authentication
- [ ] Configure proper indexes
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Use connection string with credentials
- [ ] Enable SSL/TLS

Your Express application is now fully integrated with MongoDB! 🎉
