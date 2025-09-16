// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the application database
db = db.getSiblingDB('imob_express_dev');

// Create a user for the application
db.createUser({
  user: 'user1',
  pwd: 'pwd1',
  roles: [
    {
      role: 'readWrite',
      db: 'imob_express_dev'
    }
  ]
});

// Create collections
db.createCollection('customers');

// Note: Indexes will be created automatically by Mongoose when the model is first used
// This prevents duplicate index warnings

print('Database initialization completed successfully!');
print('Database: imob_express_dev');
print('User: user1');
print('Password: pwd1');
