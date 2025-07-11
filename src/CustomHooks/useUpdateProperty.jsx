// src/CustomHooks/useUpdateProperty.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInterceptor from "./useAxiosInterceptor";


const useUpdateProperty = () => {
  const axiosSecure = useAxiosInterceptor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/api/properties/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Property updated successfully!",
        icon: "success",
        confirmButtonColor: "#48A6A7",
      });
      queryClient.invalidateQueries(["properties"]); // ✅ Refresh property list
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update property",
        icon: "error",
        confirmButtonColor: "#48A6A7",
      });
    },
  });

  return mutation;
};

export default useUpdateProperty;
