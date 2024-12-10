import { JWTPayload } from "jose"

export interface ApiResponse{
    success:boolean,
    message:string,
    data:any|null,
    errors:any|null
}

export interface Session extends JWTPayload{
    user:{
        id:string,
        name:string
    },
    accessToken:string,
    refreshToken:string
}

export interface User{
    id:string,
    name:string
}