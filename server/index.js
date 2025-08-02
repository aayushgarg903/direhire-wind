import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
let client;

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Use the connection string directly from environment variables
    const uri = process.env.MONGODB_URI;
    
    // Create a new client with minimal options - let the SRV connection string handle the rest
    const clientOptions = {
      // Basic timeouts
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000,
      
      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 1
      
      // Let the SRV connection string handle:
      // - TLS/SSL
      // - Replica set configuration
      // - Authentication source
      // - Retry writes
      // - Write concern
    };
    
    console.log('MongoDB connection options:', {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      usingConnectionString: true,
      connectionString: uri.replace(/:([^:]+)@/, ':***@') // Hide password in logs
    });
    
    client = new MongoClient(uri, clientOptions);
    
    // Connect to the database
    await client.connect();
    
    // Set the database
    db = client.db('direhire');
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      codeName: error.codeName
    });
    
    // Close the client if it exists
    if (client) {
      await client.close().catch(console.error);
    }
    
    // Exit with error
    process.exit(1);
  }
};

// Handle application shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Worker Authentication Routes
app.post('/api/auth/worker/signup', async (req, res) => {
  try {
    const { email, password, name, phone, location, profession, skillLevel, workType, experience } = req.body;

    // Check if worker already exists
    const existingWorker = await db.collection('workers').findOne({ email });
    if (existingWorker) {
      return res.status(400).json({ error: 'Worker already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create worker
    const worker = {
      email,
      password: hashedPassword,
      name,
      phone,
      location,
      profession,
      skillLevel,
      workType,
      experience: parseInt(experience),
      userType: 'worker',
      createdAt: new Date(),
      isVerified: false
    };

    const result = await db.collection('workers').insertOne(worker);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email, userType: 'worker' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Worker account created successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        name,
        userType: 'worker'
      }
    });
  } catch (error) {
    console.error('Worker signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/worker/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find worker
    const worker = await db.collection('workers').findOne({ email });
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
      { userId: worker._id, email, userType: 'worker' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: worker._id,
        email: worker.email,
        name: worker.name,
        userType: 'worker'
      }
    });
  } catch (error) {
    console.error('Worker login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Customer Authentication Routes
app.post('/api/auth/customer/signup', async (req, res) => {
  try {
    const { email, password, name, phone, location, workNeeded } = req.body;

    // Check if customer already exists
    const existingCustomer = await db.collection('customers').findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const customer = {
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

    const result = await db.collection('customers').insertOne(customer);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email, userType: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Customer account created successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        name,
        userType: 'customer'
      }
    });
  } catch (error) {
    console.error('Customer signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/customer/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer
    const customer = await db.collection('customers').findOne({ email });
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
      { userId: customer._id, email, userType: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: customer._id,
        email: customer.email,
        name: customer.name,
        userType: 'customer'
      }
    });
  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route example
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { userId, userType } = req.user;
    const collection = userType === 'worker' ? 'workers' : 'customers';
    
    const user = await db.collection(collection).findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
