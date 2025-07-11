import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useProperties = () => {
  const axiosSecure = useAxiosInterceptor();

  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/properties`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error };
};

export default useProperties;
