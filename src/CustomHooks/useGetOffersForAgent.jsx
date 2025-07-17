import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useGetOffersForAgent = () => {
  const axiosSecure = useAxiosInterceptor();
  const { user } = useAuth();


  const {
    data: properties,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/offers?agentID=${user.uid}`);
      console.log(res);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  console.log(properties);

  return { properties, isLoading, error, refetch };
};

export default useGetOffersForAgent;
