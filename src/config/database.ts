import { ConnectOptions } from 'mongoose';
import { EnvironmentConfig } from '../types';

interface DatabaseConfig {
  uri: string;
  options: ConnectOptions;
}

interface DatabaseConfigs {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

// MongoDB configuration
const config: DatabaseConfigs = {
  development: {
    uri: process.env.MONGODB_URI || 'mongodb://user1:pwd1@localhost:2701/imob_express_dev?authSource=imob_express_dev',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      bufferCommands: false
    }
  },
  test: {
    uri: process.env.MONGODB_URI || 'mongodb://user1:pwd1@localhost:2701/imob_express_test?authSource=imob_express_dev',
    options: {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      bufferCommands: false
    }
  },
  production: {
    uri: process.env.MONGODB_URI || 'mongodb://user1:pwd1@localhost:2701/imob_express_prod?authSource=imob_express_dev',
    options: {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
      retryWrites: true,
      w: 'majority'
    }
  }
};

export default config[process.env.NODE_ENV as keyof DatabaseConfigs || 'development'];
