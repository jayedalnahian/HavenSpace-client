import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useWebsiteReview = () => {
  const axiosSecure = useAxiosInterceptor();

  const {
    data: reviews,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["propertiesReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/reviews?reviewFor=website`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { reviews, isLoading, error, refetch };
};

export default useWebsiteReview;
