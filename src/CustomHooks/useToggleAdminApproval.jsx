import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useToggleAdminApproval = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationFn: async ({ propertyId, newStatus }) => {
      const res = await axiosSecure.patch(
        `/api/properties/admin-approval/${propertyId}/${newStatus}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message || "Admin approval status updated.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["allProperties"] });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.error || "Failed to update approval status.",
      });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export default useToggleAdminApproval;