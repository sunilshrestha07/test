import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect()
    try {
        const response = NextResponse.json({
            message:"Logged out successfully",
            success: true,
        })

        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0),
        })

        return response
    } catch (error) {
        return NextResponse.json({message:"Error logiing out"},{status: 500})
    }
}