import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useUpdateOfferStatus = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const {
    mutate: updateOfferStatus,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ offerId, status }) => {
      const res = await axiosSecure.patch(`/api/offers/${offerId}`, { status });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Offer status updated!",
        confirmButtonColor: "#48A6A7",
      });
      queryClient.invalidateQueries({ queryKey: ["offers"] }); // Optional: refetch offers list
    },
    onError: (error) => {
      console.error("Error updating offer status:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error?.response?.data?.error || "Something went wrong.",
        confirmButtonColor: "#48A6A7",
      });
    },
  });

  return { updateOfferStatus, isPending, isSuccess, isError, error };
};

export default useUpdateOfferStatus;
