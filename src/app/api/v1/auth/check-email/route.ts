import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { available: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { available: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    return NextResponse.json({
      available: !existingUser,
      message: existingUser ? "Email already in use" : "Email is available",
    });
  } catch (error: any) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { available: false, message: "Error checking email availability" },
      { status: 500 }
    );
  }
}
