import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useAllUsers = () => {
  const axiosSecure = useAxiosInterceptor();
  
  const {
    data: allUsers,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/all-users`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { allUsers, isLoading, error, refetch};
};

export default useAllUsers;
