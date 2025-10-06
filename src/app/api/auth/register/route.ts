import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { sendOTPEmail } from "@/lib/mail/mailer";

export const POST = async (request:NextRequest)=>{
   try {
    const { email, password, phone, role } = await request.json();
    await connectDB();
    
    // Basic validation
    if (!phone || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Phone number validation - only numbers, spaces, +, -, and parentheses allowed
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Phone number must contain only numbers" },
        { status: 400 }
      );
    }

    // Check if phone has at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return NextResponse.json(
        { message: "Phone number must have at least 10 digits" },
        { status: 400 }
      );
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" },
        { status: 400 }
      );
    }
    // Check if user already exists
    const existingUser = await User.findOne({ $or:[email?{email}:{},phone?{phone}:{}] });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // check if role is valid
    if (!['customer', 'admin', 'seller'].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }
    // create new otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Log OTP only in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔐 OTP for', email, ':', otp);
    }
    
    // Create new user
    const newUser = new User({
      email,
      password,
      phone,
      role,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    });
    
    // send otp to user
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Email failed to send, but OTP is:', otp);
      }
      return NextResponse.json(
        { message: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }
    
    await newUser.save();
    return NextResponse.json(
      { message: `User registered successfully and send otp ${email}` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error}, { status: 500 });
  } 
}
