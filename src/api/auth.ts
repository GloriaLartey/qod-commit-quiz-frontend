import api from "./axios";

// SIGNUP
export const signup = async (data: any) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

// LOGIN
export const login = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  const res = await api.post(`/auth/reset-password/${data.token}`, {
    password: data.password,
  });

  return res.data;
};