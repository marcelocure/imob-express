import mongoose, { Document, Schema, Model } from 'mongoose';
import { logger } from '../utils/debug';

// Customer interface
export interface ICustomer extends Document {
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
  fullProfile: ICustomer;
  updateLastLogin(): Promise<ICustomer>;
}

// Customer model interface with static methods
export interface ICustomerModel extends Model<ICustomer> {
  findByEmail(email: string): Promise<ICustomer | null>;
  findActive(): Promise<ICustomer[]>;
  findByRole(role: 'admin' | 'agent'): Promise<ICustomer[]>;
}

// Customer schema
const customerSchema = new Schema<ICustomer>({
  document: {
    type: String,
    required: [true, 'Document is required'],
    trim: true,
    minlength: [11, 'Document must be at least 11 characters long'],
    maxlength: [11, 'Document must be exactly 11 characters long'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  role: {
    type: String,
    enum: ['admin', 'agent'],
    default: 'agent'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profile: {
    phone: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { 
    transform: function(doc, ret) {
      delete (ret as any).__v;
      return ret;
    }
  },
  toObject: { 
    transform: function(doc, ret) {
      delete (ret as any).__v;
      return ret;
    }
  }
});

// Indexes for better performance
// Note: email index is automatically created by unique: true in schema
customerSchema.index({ role: 1 });
customerSchema.index({ isActive: 1 });

// Instance method to update last login
customerSchema.methods.updateLastLogin = function(): Promise<ICustomer> {
  (this as any).lastLogin = new Date();
  return this.save();
};

// Static method to find customer by email
customerSchema.statics.findByEmail = function(email: string): Promise<ICustomer | null> {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active customers
customerSchema.statics.findActive = function(): Promise<ICustomer[]> {
  return this.find({ isActive: true });
};

// Static method to find customers by role
customerSchema.statics.findByRole = function(role: 'admin' | 'agent'): Promise<ICustomer[]> {
  return this.find({ role, isActive: true });
};

// Ensure virtual fields are serialized
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

// Create and export the model
const Customer = mongoose.model<ICustomer, ICustomerModel>('Customer', customerSchema);

export default Customer;
