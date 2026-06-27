import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/AxiosInstance";
import ApiRoutes from "../../utils/Apiroutes";

export const useGetStores = () => {
  return useQuery({
    queryKey: ["owner-stores"],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.USER.GET);
      return res.data;
    },
  });
};

export const useRateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storeId, userId, rating }) => {
      const res = await axiosInstance.post(ApiRoutes.USER.RATING(storeId), {
        userId,
        rating,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Rated store successfully");

      queryClient.invalidateQueries({
        queryKey: ["owner-stores"],
      });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to rate this store",
      );
    },
  });
};
