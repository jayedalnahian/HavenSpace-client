// usePropertySearch.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const usePropertySearch = (searchParams) => {
  
  return useQuery({
    queryKey: ['properties', searchParams],
    queryFn: async () => {
      // Only include parameters that have values
      const params = {};
      if (searchParams.location) params.location = searchParams.location;
      if (searchParams.propertyType && searchParams.propertyType !== "Property Type") {
        params.propertyType = searchParams.propertyType;
      }
      if (searchParams.priceRange && searchParams.priceRange !== "Price Range") {
        params.priceRange = searchParams.priceRange;
      }

      const { data } = await axios.get('https://havenspace.vercel.app/properties/search', { params });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2,
    // Always enabled - let the backend handle validation
    enabled: true
  });
};

export default usePropertySearch;