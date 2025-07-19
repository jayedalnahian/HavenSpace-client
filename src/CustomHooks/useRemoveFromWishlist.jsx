// src/hooks/useRemoveFromWishlist.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosInterceptor from './useAxiosInterceptor';


const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInterceptor()

  const mutation = useMutation({
    mutationFn: async ({ propertyId, uid }) => {
      const response = await axiosSecure.patch(
        `/wishlist-properties/${propertyId}/remove`,
        { uid }
      );
      return response.data;
    },
    onSuccess: (_, { propertyId }) => {
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Property removed from your wishlist.',
        timer: 2000,
        showConfirmButton: false,
      });

      // Refetch wishlist data
      queryClient.invalidateQueries({ queryKey: ['wishlistProperties'] });
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] }); // optional if you're viewing the property
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Something went wrong while removing the property.',
      });
    },
  });

  return mutation;
};

export default useRemoveFromWishlist;
