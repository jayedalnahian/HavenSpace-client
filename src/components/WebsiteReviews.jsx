import React, { useState } from "react";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../CustomHooks/useAuth";
import usePropertyReviews from "../CustomHooks/usePropertyReviews";
import useUserData from "../CustomHooks/useUserData";
import usePostReviews from "../CustomHooks/usePostReviews";
import WebsiteReviewModal from "./WebsiteReviewModal";
import useWebsiteReview from "../CustomHooks/useWebsiteReview";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="text-[#48A6A7]" />
        ) : (
          <FaRegStar key={i} className="text-[#48A6A7]" />
        )
      )}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full"
    >
      <div className="flex items-center mb-4">
        <img
          src={review.reviewerAvatar || `https://i.ibb.co/1GxP6fDg/8608769.png`}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full border border-[#006A71] object-cover mr-3"
        />
        <div>
          <h4 className="text-[#006A71] font-semibold">
            {review.reviewerName}
          </h4>
          <StarRating rating={review.rating} />
        </div>
      </div>

      <div className="mb-4 border border-[#006A71] shadow-sm rounded-2xl px-3 py-4">
        <h3 className="text-[#48A6A7] font-medium mb-1 text-2xl">
          {review.title}
        </h3>
        <p className="text-[#006A71]">{review.text}</p>
      </div>
    </motion.div>
  );
};

const AddReviewCard = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer h-full border-2 border-dashed border-[#9ACBD0] hover:border-[#48A6A7] transition-colors"
    >
      <div className="bg-[#9ACBD0] p-4 rounded-full text-white mb-4">
        <FaPlus size={24} />
      </div>
      <h3 className="text-[#48A6A7] font-medium text-center">
        Add Your Review
      </h3>
      <p className="text-[#006A71] text-sm text-center mt-2">
        Share your experience with HavenSpace
      </p>
    </motion.div>
  );
};

const WebsiteReviews = ({ property }) => {
  const {
    reviews,
    isLoading: loadingReviews,
    refetch,
  } = useWebsiteReview(property?._id);
  refetch();
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { postReview, isPending: isPostingReview } = usePostReviews();
  const { userData, isLoading } = useUserData();

  const handleWriteReview = (property) => {
    setSelectedProperty(property);
    setShowReviewModal(true);
  };

  if (isLoading || loadingReviews) {
    return <div className="mx-auto my-auto">Loading.........</div>;
  }

  const handleReviewSubmit = async (reviewData) => {
    await postReview({
      reviewFor: "website",
      rating: reviewData.rating,
      text: reviewData.text,
      reviewerUID: user?.uid,
      reviewerName: userData.name,
      reviewerAvatar: userData.photo,
      title: reviewData.title,
      postedAt: new Date().toISOString(),
    });
    setShowReviewModal(false);
    refetch();
    // Refresh the list after submitting a review
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 rounded-2xl bg-[#F2EFE7]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#006A71] mb-2">
            💬 Latest Reviews from Our Happy Buyers
          </h2>
          <p className="text-[#48A6A7] max-w-2xl mx-auto">
            Hear what our customers are saying about their HavenSpace experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Review Card - only show if user is authenticated */}
          <AddReviewCard onClick={() => handleWriteReview(property)} />

          {/* Existing Reviews */}
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <WebsiteReviewModal
            property={selectedProperty}
            onClose={() => setShowReviewModal(false)}
            onSubmit={handleReviewSubmit}
            isSubmitting={isPostingReview}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WebsiteReviews;
