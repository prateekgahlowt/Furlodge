import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateResetToken } from '@/lib/jwt';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json(
        { message: 'If an account exists, a password reset email will be sent' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken(user.id);

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken },
    });

    // Send reset email
    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json(
      { message: 'If an account exists, a password reset email will be sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
} 