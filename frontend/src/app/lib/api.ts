import axios from "axios";


const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const api = axios.create({
  baseURL: "http://localhost:5001",
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