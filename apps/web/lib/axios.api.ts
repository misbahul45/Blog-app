import axios from "axios";
import { getSession, refreshToken } from "@/actions/auth.action";

export const API = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000,
  withCredentials: true
});

API.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry && (await getSession())?.refreshToken) {
    originalRequest._retry = true;

    const session = await getSession();
    const newAccessToken = await refreshToken(session!.refreshToken);

    if (newAccessToken) {
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return API(originalRequest);
    }
  }

  return Promise.reject(error);
});
