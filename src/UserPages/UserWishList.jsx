import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { MdLocalOffer, MdDelete, MdLocationOn, MdPerson } from "react-icons/md";
import { FaHome, FaRegHeart } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import Swal from "sweetalert2";
import useWishlistProperties from "../CustomHooks/useWishlistProperties";
import useAuth from "../CustomHooks/useAuth";
import useRemoveFromWishlist from "../CustomHooks/useRemoveFromWishlist";

const UserWishList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { wishlist, isLoading, error } = useWishlistProperties(user?.uid);
  const { mutate } = useRemoveFromWishlist();

  const RemoveFromWishlist = async (propertyId) => {
    Swal.fire({
      title: "Remove from wishlist?",
      text: "Are you sure you want to remove this property from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({
          propertyId,
          uid: user?.uid
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary rounded-full mb-2"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-800">
            Error loading wishlist
          </h3>
          <p className="text-gray-600 mt-1">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (wishlist?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <FaRegHeart className="text-4xl text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Save properties you love by clicking the heart icon when browsing.
          We'll keep them here for you.
        </p>
        <button
          onClick={() => navigate("/all-properties")}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Explore Properties
        </button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Saved Properties
          </h1>
          <p className="text-gray-600 mt-1">
            {wishlist?.length} {wishlist?.length === 1 ? "item" : "items"} in your collection
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-500 flex items-center">
            <FiClock className="mr-1" /> Recently added
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlist?.map((property) => {
            const hasRequested = property.requestedUserData?.some(
              (u) => u?.uid === user?.uid
            );

            return (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden group">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => RemoveFromWishlist(property._id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                      aria-label="Remove from wishlist"
                    >
                      <MdDelete className="text-primary text-lg" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {property.availability}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {property.title}
                    </h3>
                    <span className="text-primary font-bold text-lg">
                      ${property.maxPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <MdLocationOn className="mr-1 text-gray-500" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FaHome className="mr-1" /> {property.propertyType}
                    </span>
                    <span className="flex items-center">
                      <MdPerson className="mr-1" />{" "}
                      {property.creatorEmail?.split("@")[0] || "Owner"}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Link to={`/propertyDetails/${property._id}`} className="flex-1">
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </Link>

                    <Link to={hasRequested ? "#" : `/make-offer/${property._id}`}>
                      <button
                        disabled={hasRequested}
                        className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center ${
                          hasRequested
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-primary hover:bg-primary-dark text-white"
                        }`}
                      >
                        <MdLocalOffer className="mr-1" />
                        {hasRequested ? "Offer Requested" : "Offer"}
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserWishList;
