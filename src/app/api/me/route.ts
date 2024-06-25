import dbConnect from "@/lib/db";
import jwt from "jsonwebtoken";
import User from "@/models/signup.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = request.cookies.get("token")?.value || '';
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = (decoded as any).userId;

    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // User data retrieved successfully
    return NextResponse.json({
      message: "User found hehe",
      data: user,
    }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
