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
        name:string,
        role:Role
    },
    accessToken:string,
    refreshToken:string
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR'
}

export interface User{
    id:string,
    name:string,
    role:Role
}