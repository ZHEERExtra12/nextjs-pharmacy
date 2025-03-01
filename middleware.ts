import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async(req: Request)=>{
    const token = (await cookies()).get("token")?.value
    
    if(token){
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    else{
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"]
}