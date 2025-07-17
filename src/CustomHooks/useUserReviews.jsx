import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useUserReviews = () => {
  const axiosSecure = useAxiosInterceptor();
  const {user} = useAuth()

  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/reviews?userUid=${user.uid}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useUserReviews;
