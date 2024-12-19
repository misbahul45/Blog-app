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
                name:result.data.data.name,
                role:result.data.data.role
            },
            accessToken:result.data.data.accessToken,
            refreshToken:result.data.data.refreshToken
        })
    }
    return "Invalid credential";
}

export async function signout() {
  try {
    const res=await API.post("/auth/signout");
    if(res.status < 400) {
      (await cookies()).delete("session");
      redirect("/signin"); 
    }
    throw new Error(res.data.message);
  } catch (error) {
    console.log(error);
  }
}


export async function refreshToken(oldRefreshToken:string) {
  const res=await API.post('/auth/refresh',{refresh:oldRefreshToken});

  if(!res.data.success) {
    throw new Error(res.data.message);
  }
  const { accessToken, refreshToken }=res.data.data;

  await updateToken({ accessToken, refreshToken });

  return true
}

export async function updateToken({ accessToken, refreshToken }:{  accessToken:string, refreshToken:string }) {
  const cookie=(await cookies()).get("session")?.value;
  if(!cookie) return null;

  const result = await jwtVerify(cookie, encodedKey, {
    algorithms: ["HS256"]
  });
  const { payload: { user } } = result;

  if(!user) {
    throw new Error("Invalid cookie");
  }
  const newPayload={
    user,
    accessToken,
    refreshToken
  }

  await createSession(newPayload as Session);
}
