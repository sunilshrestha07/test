import dbConnect from "@/lib/db";
import User from "@/models/signup.model";
import { sendMail } from "@/utils/sendMail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 
  await dbConnect();
  try {
    const { email, username, password } = await request.json();
    if (!email || !username || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Checking if the user is verified or not
    const verifiedExistingUser = await User.findOne({
      email,
    });

    // If the user is verified, return an error
    if (verifiedExistingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Sending verification email
    const emailResponse = await sendMail({ email, username, verificationCode });

    // Create a new user instance
    const newUser = new User({
      email,
      username,
      password,
      verified: false,
      verificationCode: verificationCode,
      verificationExpiry: new Date(Date.now() + 120000), // 1 hour from now
    });

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "Sign up successful", newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
