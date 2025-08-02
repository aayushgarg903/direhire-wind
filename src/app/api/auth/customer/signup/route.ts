import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI as string;
const dbName = 'direhire';
const jwtSecret = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, address } = await req.json();

    // Input validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    // Check if user already exists
    const existingUser = await db.collection('customers').findOne({ email });
    if (existingUser) {
      await client.close();
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
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

    await client.close();

    return NextResponse.json({
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
