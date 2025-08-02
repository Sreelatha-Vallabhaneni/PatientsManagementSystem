import axios from "axios";


const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ,
  headers: {
    "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;