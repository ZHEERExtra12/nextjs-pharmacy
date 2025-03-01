import { createConnection } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req:any) {
    const db = await createConnection();
    const { username, password } = await req.json();

    if(!username || !password){
        return NextResponse.json({message: "Please provide username and password"}, {status: 400})
    }
    
    try{
        const selectQuery = "SELECT * FROM users WHERE username = ?";
        const [rows]:any = await db.execute(selectQuery, [username]);
        if(rows.length === 0){
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({message: "Invalid password"}, {status: 400})
        }

        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: "1h"});

        // Make sure to specify the path
        cookies().set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour
            path: "/",
          });
        return NextResponse.json({message: "Login successful"}, {status: 200})
    }
    catch(err:any){
        console.error("Login error:", err);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}