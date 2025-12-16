import { useMutation } from "@tanstack/react-query";
import { axiosApp } from "../api/axiosApp";

export type ResetPasswordLoggedInRequest = {
  email: string;
  newPassword: string;
};

export const useResetPasswordLoggedIn = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  const resetPasswordFn = async ({
    email,
    newPassword,
  }: ResetPasswordLoggedInRequest) => {
    await axiosApp.post("/auth/reset-password-logged-in/confirm", {
      email,
      newPassword,
    });
  };

  return useMutation<void, any, ResetPasswordLoggedInRequest>({
    mutationFn: resetPasswordFn,
    onSuccess,
    onError,
  });
};
