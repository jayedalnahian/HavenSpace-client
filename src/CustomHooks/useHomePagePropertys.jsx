import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useHomePagePropertys = () => {
  
  const {
    data: properties,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["HomePagePropertys"],
    queryFn: async () => {
      const res = await axios.get(`https://havenspace.vercel.app/api/home-properties`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
 

  return { properties, isLoading, error, refetch};
};

export default useHomePagePropertys;
