import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../lib/mongodb';

const router = Router();
const jwtSecret = process.env.JWT_SECRET as string;

// Worker Signup
router.post('/worker/signup', async (req, res) => {
  try {
    const { email, password, name, phone, location, profession, skillLevel, workType, experience } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDb();

    // Check if user exists
    const existingUser = await db.collection('workers').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection('workers').insertOne({
      email,
      password: hashedPassword,
      name,
      phone,
      location: location || '',
      profession: profession || '',
      skillLevel: skillLevel || 'beginner',
      workType: workType || 'full-time',
      experience: experience || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: result.insertedId, userType: 'worker' },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Worker registered successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        name,
        userType: 'worker'
      }
    });
  } catch (error) {
    console.error('Error in worker signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Worker Login
router.post('/worker/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = await getDb();
    const user = await db.collection('workers').findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: 'worker' },
      jwtSecret,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user;

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: 'worker'
      }
    });
  } catch (error) {
    console.error('Error in worker login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Customer Signup
router.post('/customer/signup', async (req, res) => {
  try {
    const { email, password, name, phone, address } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDb();

    // Check if user exists
    const existingUser = await db.collection('customers').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection('customers').insertOne({
      email,
      password: hashedPassword,
      name,
      phone,
      address: address || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: result.insertedId, userType: 'customer' },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Customer registered successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        name,
        userType: 'customer'
      }
    });
  } catch (error) {
    console.error('Error in customer signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Customer Login
router.post('/customer/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = await getDb();
    const user = await db.collection('customers').findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: 'customer' },
      jwtSecret,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user;

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: 'customer'
      }
    });
  } catch (error) {
    console.error('Error in customer login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
