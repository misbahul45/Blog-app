import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/actions/auth.action';
import { Role } from '@/types/web.types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const role = searchParams.get("role") as 'USER' | 'ADMIN' | 'EDITOR';

    if (!accessToken || !refreshToken || !userId || !name || !role) {
      return NextResponse.json(
        { error: "Invalid request" }, 
        { status: 400 }
      );
    }

    await createSession({
      user: {
        id: userId,
        name,
        role: Role[role]
      },
      accessToken,
      refreshToken
    });
    return NextResponse.redirect(new URL('/', req.url));
    
  } catch (error) {
    console.error('Google Login Error:', error);
    
    return NextResponse.json(
      { error: 'Something went wrong during Google Login' }, 
      { status: 500 }
    );
  }
}