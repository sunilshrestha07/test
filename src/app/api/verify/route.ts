import { NextResponse } from "next/server";
import User from "@/models/signup.model";
import dbConnect from "@/lib/db";
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { email, verificationCode } = await request.json();
  
        if (!email || !verificationCode) {
          return NextResponse.json({message:"all filds are required"},{status: 404})
        }
  
        const user = await User.findOne({ email });
  
        if (!user) {
          return NextResponse.json({message:"user not fould"},{status: 404})
        }
  
        if (user.verified) {
          return NextResponse.json({message:"user is already veriied"},{status: 404})
        }
  
        if (user.verificationCode !== verificationCode) {
          return NextResponse.json({message:"code doesnot match"},{status: 404})
        }
  
        if (user.verificationExpiry < new Date()) {
          return NextResponse.json({message:"time expired"},{status: 404})
        }
  
        user.verified = true;
        await user.save();
  
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET!, { expiresIn: "1h" });
        const response = NextResponse.json({
            message: "verified successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
      } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json({message:"Error verifing uer"},{status: 404})
      }
}