import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";


const usePropertyWiseReviews = (id) => {
  const axiosSecure = useAxiosInterceptor();

  const {
    data: reviews,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["propertiesReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/reviews?propertyId=${id}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 
console.log(reviews);
console.log(id);


  return {reviews, isLoading, error, refetch};
};

export default usePropertyWiseReviews;
