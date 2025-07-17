import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useUserBouthtPropetrys = () => {
  const axiosSecure = useAxiosInterceptor();
  const {user} = useAuth()

  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["userBoughtProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/sold-properties?userUid=${user.uid}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useUserBouthtPropetrys;
