import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useWishlistProperties = (userUID) => {
  const axiosSecure = useAxiosInterceptor();
  const {
    data: wishlist = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["wishlistProperties", userUID],
    enabled: !!userUID, // only run when UID is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist-properties/${userUID}`);
      return res.data;
    },
  });

  return { wishlist, isLoading, error, refetch };
};

export default useWishlistProperties;
