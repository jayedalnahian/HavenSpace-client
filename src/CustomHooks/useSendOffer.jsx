import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useSendOffer = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosInterceptor();

  const {
    mutate: sendOffer,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ propertyId, userRequestData }) => {
      console.log(propertyId);

      const res = await axiosSecure.patch(
        `/make-offer/${propertyId}`,
        userRequestData
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      const { propertyId } = variables;

      Swal.fire({
        icon: "success",
        title: "Offer Sent!",
        text: data.message || "Your offer has been submitted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Correctly scoped propertyId
      queryClient.invalidateQueries(["property", "details", propertyId]);
    },

    onError: (error) => {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    },
  });

  return { sendOffer, isPending, isSuccess, isError };
};

export default useSendOffer;
