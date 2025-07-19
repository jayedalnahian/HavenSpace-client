import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

import useUserData from "./useUserData";

const useRequestedProperties = (requestStatus) => {
  const axiosSecure = useAxiosInterceptor();
  const { userData, isUserLoading } = useUserData();

  const {
    data: requestedProperties = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["requestedProperties", userData?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/properties/requested/${userData.email}?requestStatus=${requestStatus}`
      );

      return res.data;
    },
    enabled: !isUserLoading && !!userData.email, // Don't run query until UID is available
  });

  return { requestedProperties, isLoading, isError, error, refetch };
};

export default useRequestedProperties;
