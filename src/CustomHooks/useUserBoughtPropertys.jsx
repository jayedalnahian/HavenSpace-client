import { useQuery } from '@tanstack/react-query';
import useAxiosInterceptor from './useAxiosInterceptor';


const useUserBoughtPropertys = (userId) => {
  const axiosSecure = useAxiosInterceptor();

  const {
    data: properties = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userRequestedProperties', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const response = await axiosSecure.get(
        `/api/properties/user-requests/${userId}`
      );
      return response.data; // Returns full property objects with userRequestDetails
    },
    enabled: !!userId, // Only fetch when userId exists
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return {
    properties, // Full property data including userRequestDetails
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useUserBoughtPropertys;