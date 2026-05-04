import axios from "axios";

const isDev = import.meta.env.DEV
const baseURL = isDev ? "http://localhost:3000/api" : "https://qod-commit-quiz-backend.onrender.com/api"

const api = axios.create({
  baseURL, // your backend URL
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==============================
// RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");

      // avoid redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
