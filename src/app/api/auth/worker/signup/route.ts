import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/mongodb';

const jwtSecret = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, location, profession, skillLevel, workType, experience } = await req.json();

    // Input validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if user already exists
    const existingUser = await db.collection('workers').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
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

    await client.close();

    return NextResponse.json({
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
