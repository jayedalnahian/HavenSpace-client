
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosInterceptor from './useAxiosInterceptor';


const useRevoveFromRequested = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInterceptor()

  const mutation = useMutation({
    mutationFn: async ({ propertyId, uid }) => {
        console.log(propertyId, uid);
        
      const response = await axiosSecure.patch(
        `/requested-properties/${propertyId}/remove`,
        { uid }
      );
      return response.data;
    },
    onSuccess: (_, { propertyId }) => {
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Property removed from your request.',
        timer: 2000,
        showConfirmButton: false,
      });

      // Refetch wishlist data
      queryClient.invalidateQueries({ queryKey: ['requestedProperties'] });
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

export default useRevoveFromRequested;
