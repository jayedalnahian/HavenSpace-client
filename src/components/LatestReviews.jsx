import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../CustomHooks/useAuth";
import usePropertyWiseReviews from "../CustomHooks/usePropertyWiseReviews";
import useUserData from "../CustomHooks/useUserData";
import ReviewModal from "./ReviewModal"
import usePostReviews from "../CustomHooks/usePostReviews";


// Mock review data
// const reviews = [
//   {
//     _id: { $oid: "68769f5185eba6b4c22c6acc" },
//     propertyId: "68711b4adb2ae2e5a38b7b74",
//     rating: 5,
//     text: "Absolutely loved this property! The location was perfect and the amenities were exactly as described. Would definitely recommend to others looking in this area.",
//     agentId: "ZCe5BOpQEOb7ofKVYhxIlP1XcxR2",
//     userUID: "MER4xQ2xRYTg2eoLINwhWFz91F82",
//     userName: "Alex Johnson",
//     userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     propertyIMG: "https://i.ibb.co/jktgBHyd/20250211-153809.jpg",
//     title: "Deleniti natus aliqu",
//     postedAt: "2025-07-15T18:34:57.304Z",
//   },
//   {
//     _id: { $oid: "68769f5185eba6b4c22c6acd" },
//     propertyId: "68711c99639090b3faebd8e9",
//     rating: 4,
//     text: "Great modern home with spacious rooms. The agent was very helpful throughout the process. Only minor issue was with parking space.",
//     agentId: "a1b2c3d4e5f6g7",
//     userUID: "XER4xQ2xRYTg2eoLINwhWFz91F83",
//     userName: "Sarah Williams",
//     userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     propertyIMG: "https://i.ibb.co/z6pYjYm/home1.jpg",
//     title: "Modern Family Home",
//     postedAt: "2025-07-14T12:20:45.304Z",
//   },
//   {
//     _id: { $oid: "68769f5185eba6b4c22c6ace" },
//     propertyId: "68711c99639090b3faebd8e8",
//     rating: 5,
//     text: "The ocean view from this villa is breathtaking! Worth every penny. The property was clean and well-maintained when we arrived.",
//     agentId: "h8i9j0k1l2m3n4",
//     userUID: "PER4xQ2xRYTg2eoLINwhWFz91F84",
//     userName: "Michael Chen",
//     userAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
//     propertyIMG: "https://i.ibb.co/0jq7R0y/villa.jpg",
//     title: "Luxury Villa with Ocean View",
//     postedAt: "2025-07-12T09:15:30.304Z",
//   },
// ];

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

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
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
          src={review.userAvatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h4 className="text-[#006A71] font-semibold">{review.userName}</h4>
          <StarRating rating={review.rating} />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-[#48A6A7] font-medium mb-1">{review.title}</h3>
        <p className="text-[#006A71] text-sm">{review.text}</p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center">
          <img
            src={review.propertyIMG}
            alt={review.title}
            className="w-16 h-12 rounded-md object-cover mr-3"
          />
          <span className="text-[#9ACBD0] text-xs">
            Reviewed on {formatDate(review.postedAt)}
          </span>
        </div>
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

const LatestReviews = ({ property }) => {
  const {reviews, isLoading: loadingReviews, refetch} = usePropertyWiseReviews(property?._id);
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { postReview, isPending: isPostingReview} = usePostReviews()
  const { userData, isLoading } = useUserData();
  console.log(reviews);

  const handleWriteReview = (property) => {
    setSelectedProperty(property);
    setShowReviewModal(true);
  };

  if (isLoading || loadingReviews) {
    return <div className="mx-auto my-auto">Loading.........</div>;
  }

  const handleReviewSubmit = (reviewData) => {
    postReview({
      propertyId: selectedProperty._id,
      rating: reviewData.rating,
      text: reviewData.text,
      agentId: selectedProperty.agentId,
      userUID: user?.uid,
      userName: userData.name,
      userAvatar: userData.photo,
      propertyIMG: reviewData.propertyIMG,
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
            <ReviewCard key={review._id.$oid} review={review} />
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <ReviewModal
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

export default LatestReviews;
