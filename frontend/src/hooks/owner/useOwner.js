import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/AxiosInstance";
import ApiRoutes from "../../utils/apiroutes";

export const getStores = () => {
  return useQuery({
    queryKey: ["owner-stores"],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.OWNER.GET);
      return res?.data;
    },
  });
};

export const useGetStoreRatings = () => {
  return useQuery({
    queryKey: ["owner-stores"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        ApiRoutes.OWNER.STORE_RATINGS
      );

      return res.data;
    },
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(ApiRoutes.OWNER.CREATE_STORE, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Store created successfully");
      queryClient.invalidateQueries({
        queryKey: ["owner-stores"],
        queryFn: getStores,
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create new store");
    },
  });
};
