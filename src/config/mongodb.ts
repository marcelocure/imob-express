import mongoose, { Connection } from 'mongoose';
import config from './database';
import { logger } from '../utils/debug';
import { DatabaseHealth } from '../types';

class MongoDBConnection {
  private isConnected: boolean = false;
  private connection: Connection | null = null;

  async connect(): Promise<Connection> {
    try {
      if (this.isConnected && this.connection) {
        logger.debug('MongoDB already connected');
        return this.connection;
      }

      await mongoose.connect(config.uri, config.options);
      this.connection = mongoose.connection;
      this.isConnected = true;

      mongoose.connection.on('error', (error: Error) => {
        logger.error('MongoDB connection error', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        this.isConnected = true;
        // logger.info('MongoDB reconnected');
      });

      process.on('SIGINT', async () => {
        await this.disconnect();
        process.exit(0);
      });

      return this.connection!;
    } catch (error) {
      logger.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.isConnected && this.connection) {
        await mongoose.disconnect();
        this.isConnected = false;
        this.connection = null;
      }
    } catch (error) {
      logger.error('Error disconnecting from MongoDB', error);
      throw error;
    }
  }

  getConnection(): Connection | null {
    return this.connection;
  }

  isConnectedToDB(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  async healthCheck(): Promise<DatabaseHealth> {
    try {
      if (!this.isConnectedToDB()) {
        return { status: 'disconnected', message: 'Not connected to MongoDB' };
      }

      await mongoose.connection.db?.admin().ping();
      return { 
        status: 'connected', 
        message: 'MongoDB is healthy',
        timestamp: new Date(),
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name
      } as DatabaseHealth & { host: string; port: number; name: string };
    } catch (error) {
      logger.error('MongoDB health check failed', error);
      return { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }
}

const mongoDB = new MongoDBConnection();

export default mongoDB;
