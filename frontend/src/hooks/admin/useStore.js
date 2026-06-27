import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/AxiosInstance";
import ApiRoutes from "../../utils/Apiroutes";

export const useGetAllStores = () => {
  return useQuery({
    queryKey: ["admin-stores"],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.ADMIN.GET_STORES);
      return res.data;
    },
  });
};

export const useCreateStore = ()=> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(data) =>{
      const res = await axiosInstance.post(ApiRoutes.ADMIN.CREATE_STORE, data);
      return res.data;
    }, 
    onSuccess:(data)=> {
      toast.success(data?.message ||"Store created successfully")
      queryClient.invalidateQueries({
        queryKey:["owner-stores"],
        queryFn: getStores,
      })
    }, 
    onError:(err)=>{
      toast.error(err?.response?.data?.message || "Failed to create new store")
    }
  })
}