import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/auth.action";

export default async function middleware(req:NextRequest) {
    const session=await getSession()

    if(!session || !session.user){
        return NextResponse.redirect(new URL('/signin',req.url))
    }

    return NextResponse.next()
}

export const config={
    matcher:["/profile","/dashboard"]
}