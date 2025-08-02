import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI as string;
const dbName = 'direhire';
const jwtSecret = process.env.JWT_SECRET as string;

// Helper function to verify JWT
async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; userType: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    // Get user based on type
    const collection = decoded.userType === 'worker' ? 'workers' : 'customers';
    const user = await db.collection(collection).findOne(
      { _id: new MongoClient.BSON.ObjectId(decoded.userId) },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      await client.close();
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    await client.close();

    return NextResponse.json({
      user: {
        ...user,
        userType: decoded.userType
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
