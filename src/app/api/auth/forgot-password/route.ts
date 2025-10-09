import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { sendOTPEmail } from "@/lib/mail/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
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

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
  return NextResponse.json(
    { message: "User not found." },
    { status: 404 }
  );
}

    // Generate OTP for password reset
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Log OTP only in development
    if (process.env.NODE_ENV === "development") {
      console.log("🔐 Password Reset OTP for", email, ":", otp);
    }

    // Update user with reset OTP
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp, "Password Reset");

    if (!emailSent) {
      if (process.env.NODE_ENV === "development") {
        console.log("⚠️ Email failed to send, but OTP is:", otp);
      }
      return NextResponse.json(
        { message: "Failed to send reset email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Password reset code sent to your email!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in forgot password:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
