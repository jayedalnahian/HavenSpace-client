import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useAllProperties = () => {
  const axiosSecure = useAxiosInterceptor();
  
  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/properties`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useAllProperties;
