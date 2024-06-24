import dbConnect from "@/lib/db";
import User from "@/models/signup.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const validUser = await User.findOne({ email });
        if (!validUser) {
            return NextResponse.json({ message: "No such user" }, { status: 404 });
        }

        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Wrong password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: validUser._id}, process.env.JWT_SECRET!, { expiresIn: "1h" });
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong during login" }, { status: 500 });
    }
}
