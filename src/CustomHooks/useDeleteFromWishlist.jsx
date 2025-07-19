// useDeleteProperty.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useDeleteFromWishlist = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
        
        
      const res = await axiosSecure.delete(`/api/wishlist-properties/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Property has been deleted.",
        confirmButtonColor: "#48A6A7",
      });
      queryClient.invalidateQueries(["properties"]);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete",
        confirmButtonColor: "#48A6A7",
      });
    },
  });

  return mutation;
};

export default useDeleteFromWishlist;
