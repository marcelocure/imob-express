import express, { Response } from 'express';
import Customer from '../models/Customer';
import { logger } from '../utils/debug';
import { AuthenticatedRequest, RouteHandler } from '../types';
import z from 'zod';

const router = express.Router();

// Get all customers
router.get('/', (async (req: AuthenticatedRequest, res: Response) => {
  try {
    const customers = await Customer.findActive();
    logger.debug('Retrieved customers', { count: customers.length });
    
    res.json(customers);
  } catch (error) {
    logger.error('Error retrieving customers', error);
    res.status(500).json({
      error: 'Failed to retrieve customers',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RouteHandler);

// Get customer by ID
router.get('/:id', (async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    
    if (!customer) {
      res.status(404).json({
        error: 'Customer not found',
        message: `No customer found with ID: ${id}`
      });
      return;
    }
    
    logger.debug('Retrieved customer', { customerId: id });
    res.json(customer);
  } catch (error) {
    logger.error('Error retrieving customer', error);
    res.status(500).json({
      error: 'Failed to retrieve customer',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RouteHandler);

// Create customer
router.post('/', (async (req: AuthenticatedRequest, res: Response) => {
  try {
    const CustomerInput = z.object({
      document: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.enum(['admin', 'agent']).optional(),
      isActive: z.boolean().optional(),
      profile: z.object({
        phone: z.string().optional(),
        avatar: z.string().optional(),
        bio: z.string().optional(),
      }).optional(),
    });

    const validatedData = CustomerInput.parse(req.body);
    const customer = new Customer(validatedData);
    await customer.save();
    
    logger.info('Customer created', { customerId: customer._id, email: customer.email });
    res.status(201).json(customer.fullProfile);
  } catch (error: any) {
    logger.error('Error creating customer', error);
    
    if (error instanceof z.ZodError) {
      res.status(400).json({error: JSON.parse(error.message)});
      return;
    }
    
    if (error.code === 11000) {
      res.status(400).json({
        error: 'Email already exists',
        message: 'A customer with this email already exists'
      });
      return;
    }
    
    res.status(500).json({
      error: 'Failed to create customer',
      message: error.message
    });
  }
}) as RouteHandler);

// Update customer
router.put('/:id', (async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!customer) {
      res.status(404).json({
        error: 'Customer not found',
        message: `No customer found with ID: ${id}`
      });
      return;
    }
    
    logger.info('Customer updated', { customerId: id, email: customer.email });
    res.json(customer.fullProfile);
  } catch (error: any) {
    logger.error('Error updating customer', error);
    
    if (error.name === 'ValidationError') {
      res.status(400).json({
        error: 'Validation failed',
        details: Object.values(error.errors).map((err: any) => err.message)
      });
      return;
    }
    
    if (error.code === 11000) {
      res.status(400).json({
        error: 'Email already exists',
        message: 'A customer with this email already exists'
      });
      return;
    }
    
    res.status(500).json({
      error: 'Failed to update customer',
      message: error.message
    });
  }
}) as RouteHandler);

// Delete customer (hard or soft delete based on query parameter)
router.delete('/:id', (async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { deletionType = 'soft' } = req.query;

    const customer = await Customer.findById(id);

    if (!customer) {
      res.status(404).json({
        error: 'Customer not found',
        message: `No customer found with ID: ${id}`
      });
      return;
    }
    
    if (deletionType === 'hard') {
      await customer.deleteOne();
      res.json({
        message: 'Customer removed successfully',
        customer: customer.fullProfile
      });
    } else {
      await customer.updateOne({ _id: id }, { isActive: false });
      res.json({
        message: 'Customer deactivated successfully',
        customer: customer.fullProfile
      });
    }
  } catch (error) {
    logger.error('Error deactivating customer', error);
    res.status(500).json({
      error: 'Failed to deactivate customer',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RouteHandler);

export default router;