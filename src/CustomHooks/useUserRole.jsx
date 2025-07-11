import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";


const useUserRole = () => {
  const axiosSecure = useAxiosInterceptor();
  const {user, loading} = useAuth()
  const uid = user?.uid;
  

  const { data: role, isLoading, error } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user-role/${uid}`);
      console.log(uid);
      
      return res.data.role;
    },
    staleTime: 5 * 60 * 1000,
  });


  return { role, isLoading, error, loading};
};

export default useUserRole;
