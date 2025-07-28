import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/mongodb';
import { User } from '@/app/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'Email already registered'
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create new user
    const user = await User.create({
      ...body,
      password: hashedPassword,
      role: 'boarder'
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    }, { status: 201 });
  } catch (error) {
    console.error('Error registering boarder:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to register boarder'
    }, { status: 500 });
  }
} 