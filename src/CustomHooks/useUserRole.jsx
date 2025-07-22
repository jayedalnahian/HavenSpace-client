import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";


const useUserRole = () => {
  const axiosSecure = useAxiosInterceptor();
  const { user, loading: authLoading } = useAuth();
  const uid = user?.uid;
  
  
  
  
  
  
  const { 
    data: role, 
    isLoading: queryLoading, 
    error 
  } = useQuery({
    queryKey: ["userRole", uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user-role/${uid}`);
      return res?.data?.role;
      
    },
    enabled: !!uid && !authLoading, // Wait until auth is loaded
    staleTime: 5 * 60 * 1000,
  });
  

  

  return { 
    role, 
    isLoading: queryLoading || authLoading, 
    error 
  };
};

export default useUserRole;