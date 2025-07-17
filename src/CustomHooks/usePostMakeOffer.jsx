import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const usePostMakeOffer = () => {
  const axiosSecure = useAxiosInterceptor();

  const {
    mutate: makeOffer,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (offerData) => {
      const res = await axiosSecure.post("/api/offers", offerData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Offer submitted!",
        confirmButtonColor: "#48A6A7",
      });
    },
    onError: (error) => {
      console.error("Offer submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error submitting offer",
        text: error?.response?.data?.error || "Something went wrong.",
        confirmButtonColor: "#48A6A7",
      });
    },
  });

  return { makeOffer, isPending, isSuccess, isError, error };
};

export default usePostMakeOffer;
