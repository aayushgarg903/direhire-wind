import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI as string;
const dbName = 'direhire';
const jwtSecret = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    // Find user
    const user = await db.collection('workers').findOne({ email });
    if (!user) {
      await client.close();
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await client.close();
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, userType: 'worker' },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userData } = user;

    await client.close();

    return NextResponse.json({
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
