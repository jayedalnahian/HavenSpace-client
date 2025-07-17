import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useWishlishtPropertys = () => {
  const axiosSecure = useAxiosInterceptor();
  const {user} = useAuth()

  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["WishListPropertys"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/wishlist-properties?uid=${user?.uid}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useWishlishtPropertys;
