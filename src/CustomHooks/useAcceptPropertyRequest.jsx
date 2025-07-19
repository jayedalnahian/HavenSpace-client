import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosInterceptor from './useAxiosInterceptor';
import Swal from 'sweetalert2';

const useAcceptPropertyRequest = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (propertyId) => {
      const response = await axiosSecure.patch(
        `/api/properties/accept-request/${propertyId}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['requestedProperties']);
      
      Swal.fire({
        icon: 'success',
        title: 'Request Accepted!',
        text: data.message || 'Property request has been accepted',
        timer: 2000,
        showConfirmButton: false
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 
             'Failed to accept property request',
        confirmButtonColor: '#006A71'
      });
    }
  });

  return mutation;
};

export default useAcceptPropertyRequest;