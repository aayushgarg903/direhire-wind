import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (replace with MongoDB later)
const workers = [];
const customers = [];

console.log('🚀 Mock server starting on port', PORT);

// Worker Authentication Routes
app.post('/api/auth/worker/signup', async (req, res) => {
  try {
    console.log('📝 Worker signup request:', req.body.email);
    const { email, password, name, phone, location, profession, skillLevel, workType, experience } = req.body;

    // Check if worker already exists
    const existingWorker = workers.find(w => w.email === email);
    if (existingWorker) {
      return res.status(400).json({ error: 'Worker already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create worker
    const worker = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      phone,
      location,
      profession,
      skillLevel,
      workType,
      experience: parseInt(experience) || 0,
      userType: 'worker',
      createdAt: new Date(),
      isVerified: false
    };

    workers.push(worker);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: worker.id, email, userType: 'worker' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    console.log('✅ Worker created successfully:', email);
    res.status(201).json({
      message: 'Worker account created successfully',
      token,
      user: {
        id: worker.id,
        email,
        name,
        userType: 'worker'
      }
    });
  } catch (error) {
    console.error('❌ Worker signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/worker/login', async (req, res) => {
  try {
    console.log('🔐 Worker login request:', req.body.email);
    const { email, password } = req.body;

    // Find worker
    const worker = workers.find(w => w.email === email);
    if (!worker) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, worker.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: worker.id, email, userType: 'worker' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    console.log('✅ Worker login successful:', email);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: worker.id,
        email: worker.email,
        name: worker.name,
        userType: 'worker'
      }
    });
  } catch (error) {
    console.error('❌ Worker login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Customer Authentication Routes
app.post('/api/auth/customer/signup', async (req, res) => {
  try {
    console.log('📝 Customer signup request:', req.body.email);
    const { email, password, name, phone, location, workNeeded } = req.body;

    // Check if customer already exists
    const existingCustomer = customers.find(c => c.email === email);
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const customer = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      phone,
      location,
      workNeeded,
      userType: 'customer',
      createdAt: new Date(),
      isVerified: false
    };

    customers.push(customer);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: customer.id, email, userType: 'customer' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    console.log('✅ Customer created successfully:', email);
    res.status(201).json({
      message: 'Customer account created successfully',
      token,
      user: {
        id: customer.id,
        email,
        name,
        userType: 'customer'
      }
    });
  } catch (error) {
    console.error('❌ Customer signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/customer/login', async (req, res) => {
  try {
    console.log('🔐 Customer login request:', req.body.email);
    const { email, password } = req.body;

    // Find customer
    const customer = customers.find(c => c.email === email);
    if (!customer) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: customer.id, email, userType: 'customer' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    console.log('✅ Customer login successful:', email);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        userType: 'customer'
      }
    });
  } catch (error) {
    console.error('❌ Customer login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Mock server is running',
    workers: workers.length,
    customers: customers.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Mock server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
