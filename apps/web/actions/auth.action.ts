'use server';
import { API } from "@/lib/axios.api";
import { AUTHTYPES } from "@/types/auth.types";
import { ApiResponse, Session } from "@/types/web.types";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose"

const secretKey=process.env.SESSION_SECRET_KEY
const encodedKey=new TextEncoder().encode(secretKey)

export const createSession=async(payload:Session)=>{
  const expiredAt = new Date(Date.now()+7*24*60*60*1000);

  const session=await new SignJWT(payload)
  .setProtectedHeader({alg:'HS256'})
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(encodedKey);

  (await cookies()).set("session",session,{
    httpOnly:true,
    secure:true,
    expires:expiredAt,
    sameSite:'lax',
    path:'/'
  })
}

export const getSession=async()=>{
  const cookie=(await cookies()).get("session")?.value;
 if(!cookie) return null;

  try {
    const {payload}=await jwtVerify(cookie,encodedKey,{
      algorithms:["HS256"]
    });
    return payload as Session;
  } catch (error) {
    console.log(error);
    redirect("/signin")
  }
}

export async function signup(data: AUTHTYPES.SIGNUP): Promise<ApiResponse|string> {
    const result = await API.post('/auth/signup', data);
    if(result.data.success) {
        await signin({email:data.email,password:data.password});
    }
    return "User already exists";
}

export async function signin(data:AUTHTYPES.SIGNIN):Promise<ApiResponse|string> {
    const result = await API.post('/auth/signin', data);
    if(result.data.success) {
        await createSession({
            user:{
                id:result.data.data.id,
                name:result.data.data.name
            },
            accessToken:result.data.data.accessToken,
            refreshToken:result.data.data.refreshToken
        })
        redirect("/");
    }
    return "Invalid credential";
}

export async function signout() {
  (await cookies()).delete("session");
  redirect("/signin");
}