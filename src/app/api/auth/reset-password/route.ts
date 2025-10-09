import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { message: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.otp || !user.otpExpires) {
      return NextResponse.json(
        { message: 'No password reset request found. Please request a new one.' },
        { status: 400 }
      );
    }

    if (new Date() > user.otpExpires) {
      return NextResponse.json(
        { message: 'Reset code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { message: 'Invalid reset code. Please try again.' },
        { status: 400 }
      );
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Password reset successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
