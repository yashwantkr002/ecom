import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { available: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone format - only numbers, spaces, +, -, and parentheses allowed
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { available: false, message: 'Phone number must contain only numbers' },
        { status: 400 }
      );
    }

    // Check if phone has at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return NextResponse.json(
        { available: false, message: 'Phone number must have at least 10 digits' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if phone exists in database
    const existingUser = await User.findOne({ phone });

    return NextResponse.json({
      available: !existingUser,
      message: existingUser ? 'Phone number already in use' : 'Phone number is available',
    });
  } catch (error: any) {
    console.error('Error checking phone:', error);
    return NextResponse.json(
      { available: false, message: 'Error checking phone number availability' },
      { status: 500 }
    );
  }
}
