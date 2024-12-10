'use server'
import { API } from "@/lib/axios.api"
import { getSession } from "./auth.action"

export const getProfile=async()=>{
    try {
        const session=await getSession()
        const res=await API.get("/auth/jwt",{
            headers:{
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}