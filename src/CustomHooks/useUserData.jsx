import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useUserData = () => {
  const axiosSecure = useAxiosInterceptor();
  const {user} = useAuth()

  const {
    data: userData,
    isLoading : isUserLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auth/users/${user.uid}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  

  return { userData, isUserLoading, error, refetch};
};

export default useUserData;
