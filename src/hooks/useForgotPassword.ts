import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
};