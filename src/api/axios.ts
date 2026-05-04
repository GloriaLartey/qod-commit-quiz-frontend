import axios from "axios";

const isDev = import.meta.env.DEV
const baseURL = isDev ? "http://localhost:3000/api" : "https://qod-commit-quiz-backend.onrender.com/api"

const api = axios.create({
  baseURL, // your backend URL
});

//Attach token automatically (important)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;