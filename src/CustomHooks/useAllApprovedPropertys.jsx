import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useAllApprovedPropertys = () => {
  const axiosSecure = useAxiosInterceptor();
  
  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["AllProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/all-properties`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useAllApprovedPropertys;
