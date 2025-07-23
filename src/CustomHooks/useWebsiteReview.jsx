import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const useWebsiteReview = () => {


  const {
    data: reviews,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["propertiesReviews"],
    queryFn: async () => {
      const res = await axios.get(`https://b11a12-server-side-jayedalnahian.vercel.app/api/reviews?reviewFor=website`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { reviews, isLoading, error, refetch };
};

export default useWebsiteReview;
