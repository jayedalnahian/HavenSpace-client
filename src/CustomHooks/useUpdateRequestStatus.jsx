import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useUpdateRequestStatus = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ propertyId, requestStatus, userEmailToRemove }) => {
      const res = await axiosSecure.patch(
        `/api/properties/requestStatus/${propertyId}?email=${userEmailToRemove}`,
        { requestStatus, userEmailToRemove }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Request status updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["requestedProperties"]);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message ||
          error.message ||
          "Failed to update request status",
      });
    }
  });

  return mutation;
};

export default useUpdateRequestStatus;