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
      return NextResponse.json(
        { message: "Failed to send OTP" },
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