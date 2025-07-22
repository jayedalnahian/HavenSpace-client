import React from "react";
import { FaTrash, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import useUserReviews from "../CustomHooks/useUserReviews";
import useDeleteReview from "../CustomHooks/useDeleteReview";
import Swal from "sweetalert2";

const ManageReviews = () => {
  const { reviews: userReviews, isLoading, error, refetch } = useUserReviews();
  const { mutate: deleteReview } = useDeleteReview();

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleDeleteReview = (reviewId) => {
    // Using SweetAlert for confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#48A6A7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReview(reviewId, {
          onSuccess: () => {
            refetch(); // Refresh the reviews list after successful deletion
          },
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006A71] mx-auto"></div>
          <p className="mt-4 text-lg" style={{ color: "#006A71" }}>
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <p className="text-red-500 mb-4">
            Error loading reviews: {error.message}
          </p>
          <button
            onClick={refetch}
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: "#48A6A7",
              color: "#F2EFE7",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{ backgroundColor: "#F2EFE7" }}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: "#006A71" }}
        >
          Manage User Reviews
        </h1>

        {/* Review Count */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 text-center">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-2xl font-bold" style={{ color: "#006A71" }}>
            {userReviews.length}
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {userReviews.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: "#9ACBD0" }}>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Reviewer
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Property
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Rating
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Review
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userReviews.map((review) => (
                    <motion.tr
                      key={review._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Reviewer Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={
                                review.reviewerAvatar ||
                                `https://ui-avatars.com/api/?name=${review.reviewerName}&background=random`
                              }
                              alt={review.reviewerName}
                            />
                          </div>
                          <div className="ml-3">
                            <div
                              className="text-sm font-medium"
                              style={{ color: "#006A71" }}
                            >
                              {review.reviewerName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={review.propertyIMG}
                              alt={review.title}
                            />
                          </div>
                          <div
                            className="ml-3 text-sm font-medium"
                            style={{ color: "#006A71" }}
                          >
                            {review.title}
                          </div>
                        </div>
                      </td>

                      {/* Rating Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>

                      {/* Review Content Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm line-clamp-3">
                          {review.text}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#EF4444",
                            border: "1px solid #EF4444",
                          }}
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-xl mb-2" style={{ color: "#006A71" }}>
                No reviews found
              </p>
              <p className="text-gray-600">
                No reviews have been submitted yet
              </p>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {userReviews.length > 0 ? (
            userReviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full object-cover mr-3"
                        src={
                          review.reviewerAvatar ||
                          `https://ui-avatars.com/api/?name=${review.reviewerName}&background=random`
                        }
                        alt={review.reviewerName}
                      />
                      <div>
                        <h3
                          className="text-lg font-medium"
                          style={{ color: "#006A71" }}
                        >
                          {review.reviewerName}
                        </h3>
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-md object-cover mr-3"
                        src={review.propertyIMG}
                        alt={review.title}
                      />
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#006A71" }}
                      >
                        {review.title}
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#006A71" }}
                      >
                        Review
                      </p>
                      <p className="text-sm">{review.text}</p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="flex items-center px-3 py-1 rounded-lg text-xs"
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#EF4444",
                          border: "1px solid #EF4444",
                        }}
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg mb-2" style={{ color: "#006A71" }}>
                No reviews found
              </p>
              <p className="text-gray-600 text-sm">
                No reviews have been submitted yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
