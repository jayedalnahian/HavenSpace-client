import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";


const useHomeReviews = () => {
  const axiosSecure = useAxiosInterceptor();


  const {
    data: reviews,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["homeReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/HomeReviews`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { reviews, isLoading, error, refetch};
};

export default useHomeReviews;
