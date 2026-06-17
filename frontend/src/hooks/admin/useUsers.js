import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/AxiosInstance";
import ApiRoutes from "../../utils/apiroutes";
import { data } from "react-router-dom";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log(ApiRoutes.ADMIN.GET_USERS, "API");
      const res = await axiosInstance.get(ApiRoutes.ADMIN.GET_USERS);
      console.log(res.data, "use");

      return res.data;
    },
  });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.ADMIN.GET_USER_BY_ID(id));
      return res.data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(ApiRoutes.ADMIN.CREATE_USER, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "User created successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(data?.res?.message || "Failed to create new user");
    },
  });
};
