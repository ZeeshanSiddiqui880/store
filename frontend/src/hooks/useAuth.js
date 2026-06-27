import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/Apiroutes";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axiosInstance.post(ApiRoutes.LOGIN, {
        email,
        password,
      });
      return response.data;
      console.log(response.data);
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(ApiRoutes.REGISTER, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(
        ApiRoutes.CHANGE_PASSWORD,
        data,
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
};
