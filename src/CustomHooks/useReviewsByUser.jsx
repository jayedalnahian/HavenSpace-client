import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useReviewsByUser = (userUID) => {
  const axiosSecure = useAxiosInterceptor();
  const {
    data: reviews,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/property-reviews/${userUID}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { reviews, isLoading, error, refetch};
};

export default useReviewsByUser;
