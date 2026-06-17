import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/AxiosInstance";
import ApiRoutes from "../../utils/apiroutes";

export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.ADMIN.GET_ALL);
      console.log(res.data, "res");
      return res.data;
      
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to get admin dashboard details"
      );
    },
  });
};