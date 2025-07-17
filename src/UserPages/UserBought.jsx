import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { data, useNavigate } from "react-router";
import useUserBouthtPropetrys from "../CustomHooks/useUserBouthtPropetrys";
import usePostReviews from "../CustomHooks/usePostReviews";
import useAuth from "../CustomHooks/useAuth";
import ReviewModal from "../components/ReviewModal";

const UserBought = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  // const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const { postReview, isPending: isPostingReview } = usePostReviews();
  const { user } = useAuth();
  const {
    properties: userBoughtProperties = [],
    isLoading,
    error,
    refetch,
  } = useUserBouthtPropetrys();
  refetch();

  const handleViewDetails = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  const handleWriteReview = (property) => {
    setSelectedProperty(property);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (reviewData) => {
    postReview({
      propertyId: selectedProperty._id,
      rating: reviewData.rating,
      text: reviewData.text,
      agentId: selectedProperty.agentId,
      userUID: user?.uid,
      propertyIMG: reviewData.propertyIMG,
      title: reviewData.title,
      postedAt: new Date().toISOString(),
    });
    setShowReviewModal(false);
    refetch(); // Refresh the list after submitting a review
  };

  const totalSpent = userBoughtProperties.reduce(
    (sum, property) => sum + (property.maxPrice || 0),
    0
  );

  // const filteredProperties = filter === 'all'
  //   ? userBoughtProperties
  //   : userBoughtProperties.filter(property =>
  //       property.availability?.includes(filter)
  //     );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-100 p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error loading properties
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={refetch}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (userBoughtProperties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4"
      >
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-main mb-4">
            You haven't purchased any properties yet
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our listings to find your dream property.
          </p>
          <button
            onClick={() => navigate("/all-properties")}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-main">Bought Properties</h1>
          <p className="text-gray-600 mt-1">
            Total spent:{" "}
            <span className="font-semibold text-main">
              ${totalSpent.toLocaleString()}
            </span>
          </p>
        </div>

        {/* <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="Sold">Owned</option>
            <option value="Pending">Processing</option>
          </select>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {userBoughtProperties.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image || "/default-property.jpg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/default-property.jpg";
                  }}
                />
                {/* <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    property.availability === "Sold"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.availability || 'Processing'}
                </div> */}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-main">
                    {property.title}
                  </h3>
                  <span className="text-primary font-bold">
                    ${property.maxPrice?.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-1">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{property.location}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>{property.propertyType}</span>
                  <span>Agent: {property.agentEmail}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    Purchased:{" "}
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewDetails(property._id)}
                    className="flex-1 bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleWriteReview(property)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                  >
                    Write Review
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showReviewModal && (
        <ReviewModal
          property={selectedProperty}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
          isSubmitting={isPostingReview}
        />
      )}
    </div>
  );
};

export default UserBought;
