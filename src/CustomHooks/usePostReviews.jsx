import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";


const usePostReviews = () => {
  const axiosSecure = useAxiosInterceptor();

  const {
    mutate: postReview,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/api/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Review submitted!",
        confirmButtonColor: "#48A6A7",
      });
    },
    onError: (error) => {
      console.error("Review submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error submitting review",
        text: error?.response?.data?.error || "Something went wrong.",
        confirmButtonColor: "#48A6A7",
      });
    },
  });

  return { postReview, isPending, isSuccess, isError, error };
};

export default usePostReviews;
