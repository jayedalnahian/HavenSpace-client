import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useAddToWishlist = () => {
  const axiosSecure = useAxiosInterceptor();

  const {
    mutate: addToWishlist,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (propertyData) => {

      const res = await axiosSecure.post("/api/wishlist", propertyData);

      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Added to wishlist!",
        confirmButtonColor: "#48A6A7",
      });
    },
    onError: (error) => {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        confirmButtonColor: "#48A6A7",
      });
    },
  });

  return { addToWishlist, isPending, isSuccess, isError, error };
};

export default useAddToWishlist;
