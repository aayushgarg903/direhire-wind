import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../lib/mongodb';

const router = Router();

// Middleware to verify JWT
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET as string;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; userType: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Get user profile
router.get('/profile', authenticateToken, async (req: any, res) => {
  try {
    const { userId, userType } = req.user;
    const db = await getDb();
    const collection = userType === 'worker' ? 'workers' : 'customers';
    
    const user = await db.collection(collection).findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      user: {
        ...user,
        userType
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: any, res) => {
  try {
    const { userId, userType } = req.user;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated
    delete updateData.password;
    delete updateData._id;
    delete updateData.userType;
    delete updateData.createdAt;
    
    updateData.updatedAt = new Date();

    const db = await getDb();
    const collection = userType === 'worker' ? 'workers' : 'customers';
    
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
