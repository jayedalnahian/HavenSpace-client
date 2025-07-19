import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";
import useAuth from "./useAuth";

const useAgentAddedPropertys = () => {
  const axiosSecure = useAxiosInterceptor();
  const { user } = useAuth();

  const {
    data: agentAddedPropertys = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["agentAddedPropertys", user?.uid],
    queryFn: async () => {
      // Verify user exists before making the request
      if (!user?.uid) {
        throw new Error("User UID not available");
      }

      // Make the request with proper parameter formatting
      const response = await axiosSecure.get("/api/properties", {
        params: {
          agentUID: user.uid
        }
      });

      // Verify response structure
      if (!response.data) {
        throw new Error("Invalid response structure");
      }

      return response.data;
    },
    enabled: !!user?.uid,
    staleTime: 5 * 60 * 1000,
    retry: 2, // Add retry for failed requests
  });

  return { 
    agentAddedPropertys, 
    isLoading, 
    error, 
    refetch 
  };
};

export default useAgentAddedPropertys;