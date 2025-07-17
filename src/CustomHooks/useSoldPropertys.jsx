import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useSoldPropertys = () => {
  const axiosSecure = useAxiosInterceptor();
  const {user} = useAuth()

  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["SoldProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/properties/sold?agentId=${user.uid}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useSoldPropertys;
