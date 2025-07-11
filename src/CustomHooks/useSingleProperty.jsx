import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useSingleProperty = (id) => {
  const axiosSecure = useAxiosInterceptor();

//   const {
//     data: properties,
//     isLoading,
//     error,
// } = useQuery({
//     queryKey: ["properties"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/api/properties/${id}`);

//       return res.data;
//     },
//     staleTime: 5 * 60 * 1000,
//   });
 const { data: property, isLoading, error } = useQuery({
     queryKey: ["properties", id], // Include id in queryKey for proper caching
     queryFn: async () => {
       const res = await axiosSecure.get(`/api/properties/${id}`);
       return res.data;
     },
     staleTime: 5 * 60 * 1000, // Cache for 5 minutes
   });

  return { property, isLoading, error };
};

export default useSingleProperty;
