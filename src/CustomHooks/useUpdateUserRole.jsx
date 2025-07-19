import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosInterceptor from './useAxiosInterceptor';

const useUpdateUserRole = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const updateUserRole = async ({ userId, newRole }) => {
    const response = await axiosSecure.patch(
      `/api/user-role-update/${userId}/${newRole}`
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data, variables) => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      Swal.fire({
        title: 'Success!',
        text: `User role has been updated to ${variables.newRole}`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#48A6A7',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.error || 'Failed to update user role',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
      });
    },
  });

  const handleUpdateRole = (userId, newRole) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change this user's role to ${newRole}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#48A6A7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ userId, newRole });
      }
    });
  };

  return {
    updateUserRole: handleUpdateRole,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export default useUpdateUserRole;