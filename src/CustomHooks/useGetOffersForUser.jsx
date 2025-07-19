import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useGetOffersForUser = () => {
  const axiosSecure = useAxiosInterceptor();
  const { user } = useAuth();


  const {
    data: offers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["Offers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/offers?userID=${user.uid}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });


  return { offers, isLoading, error, refetch };
};

export default useGetOffersForUser;
