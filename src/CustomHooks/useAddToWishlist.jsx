// src/hooks/useAddToWishlist.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosInterceptor from './useAxiosInterceptor';

const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInterceptor()

  const mutation = useMutation({
    mutationFn: async ({ propertyId, wishlistUser }) => {
      const response = await axiosSecure.patch(`/properties/${propertyId}/wishlist`, {
        wishlistStatus: "true",
        wishlistUser: wishlistUser,
      });
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Added to wishlist!',
        text: 'This property has been successfully added to your wishlist.',
        timer: 2000,
        showConfirmButton: false,
      });
      // Refetch property data if needed
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: error.response?.data?.error || 'Something went wrong',
      });
    },
  });

  return mutation;
};

export default useAddToWishlist;
