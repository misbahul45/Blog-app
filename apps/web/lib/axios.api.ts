import axios from "axios";
export const API=axios.create({
    baseURL:process.env.BACKEND_URL
})