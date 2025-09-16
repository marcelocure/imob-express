# Docker Setup for MongoDB

This guide explains how to set up MongoDB using Docker Compose for the Imob Express application.

## 🐳 **Docker Compose Configuration**

### **Files Created**
- `docker-compose.yml` - Docker Compose configuration
- `mongo-init.js` - MongoDB initialization script
- Updated `.env` with MongoDB credentials

### **MongoDB Configuration**
- **Database**: `imob_express_dev`
- **Username**: `user1`
- **Password**: `pwd1`
- **Port**: `2701` (mapped from internal 27017)
- **Authentication**: Enabled

## 🚀 **Getting Started**

### **1. Start MongoDB Container**
```bash
# Start MongoDB with Docker Compose
docker-compose up -d

# Check if container is running
docker-compose ps

# View logs
docker-compose logs mongodb
```

### **2. Stop MongoDB Container**
```bash
# Stop the container
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### **3. Restart MongoDB Container**
```bash
# Restart the container
docker-compose restart

# Or stop and start again
docker-compose down && docker-compose up -d
```

## 🔧 **Database Management**

### **Connect to MongoDB**
```bash
# Connect using Docker
docker exec -it imob-express-mongodb mongosh -u user1 -p pwd1 --authenticationDatabase imob_express_dev

# Or connect from host
mongosh "mongodb://user1:pwd1@localhost:2701/imob_express_dev?authSource=imob_express_dev"
```

### **View Database Status**
```bash
# Check if database exists
docker exec -it imob-express-mongodb mongosh -u user1 -p pwd1 --authenticationDatabase imob_express_dev --eval "show dbs"

# Check collections
docker exec -it imob-express-mongodb mongosh -u user1 -p pwd1 --authenticationDatabase imob_express_dev --eval "use imob_express_dev; show collections"
```

## 📊 **Database Structure**

### **Collections Created**
- `customers` - Customer data collection

### **Indexes Created**
- `email` - Unique index on email field
- `document` - Unique index on document field
- `role` - Index on role field
- `isActive` - Index on isActive field

## 🛠 **Development Workflow**

### **1. Start Development Environment**
```bash
# Start MongoDB
docker-compose up -d

# Start Express application
npm start

# Or with debug
npm run debug
```

### **2. Test Database Connection**
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test customer creation
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","document":"12345678901","role":"agent"}'
```

### **3. View Data**
```bash
# View all customers
curl http://localhost:3000/api/customers

# Or connect to MongoDB directly
docker exec -it imob-express-mongodb mongosh -u user1 -p pwd1 --authenticationDatabase imob_express_dev --eval "use imob_express_dev; db.customers.find().pretty()"
```

## 🔍 **Troubleshooting**

### **Container Won't Start**
```bash
# Check logs
docker-compose logs mongodb

# Check if port is already in use
netstat -tulpn | grep 2701

# Stop conflicting MongoDB instances
sudo pkill -f mongod
```

### **Authentication Issues**
```bash
# Check if user exists
docker exec -it imob-express-mongodb mongosh -u user1 -p pwd1 --authenticationDatabase imob_express_dev --eval "use imob_express_dev; db.getUsers()"

# Reset database (WARNING: This will delete all data)
docker-compose down -v
docker-compose up -d
```

### **Connection Refused**
```bash
# Check if container is running
docker-compose ps

# Check container logs
docker-compose logs mongodb

# Restart container
docker-compose restart
```

## 📁 **File Structure**

```
imob-express/
├── docker-compose.yml      # Docker Compose configuration
├── mongo-init.js          # MongoDB initialization script
├── .env                   # Environment variables
├── config/
│   └── database.js        # MongoDB connection config
└── models/
    └── Customer.js        # Customer model
```

## 🎯 **Production Notes**

For production deployment:

1. **Change default credentials** in `docker-compose.yml`
2. **Use environment variables** for sensitive data
3. **Enable SSL/TLS** for secure connections
4. **Set up backup strategy** for data persistence
5. **Use Docker secrets** for credential management

## 🚀 **Quick Commands**

```bash
# Start everything
docker-compose up -d && npm start

# Stop everything
docker-compose down

# View logs
docker-compose logs -f mongodb

# Reset database
docker-compose down -v && docker-compose up -d
```

Your MongoDB is now ready for development! 🎉
