import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import {
  FaMapMarkerAlt,
  FaUser,
  FaMoneyBillWave,
  FaCreditCard,
  FaClock,
  FaHome,
  FaBed,
  FaBath,
} from "react-icons/fa";
import useAuth from "../CustomHooks/useAuth";
import useAxiosInterceptor from "../CustomHooks/useAxiosInterceptor";
import Swal from "sweetalert2";
import useUserBoughtPropertys from "../CustomHooks/useUserBoughtPropertys";
import { MdDelete } from "react-icons/md";
import useRevoveFromRequested from "../CustomHooks/useRevoveFromRequested";

const UserBought = () => {
  const { user } = useAuth();
  const { mutate } = useRevoveFromRequested()
  const { properties, isLoading, isError, error, refetch } =
    useUserBoughtPropertys(user?.uid);
  const navigate = useNavigate();
  const axiosSecure = useAxiosInterceptor();


  const handleDelete = (property) => {

    const propertyId = property?._id;
    const uid = property?.userRequestDetails?.uid
    mutate({ propertyId, uid })
    refetch()
  };

  const handlePayment = async (property) => {
    try {
      const offer = {
        _id: property._id, // This can be treated as the offer ID
        offerDetails: {
          amount:
            property?.userRequestDetails?.offerAmount || property.minPrice,
        },
        property: {
          _id: property._id,
          title: property.title,
          location: property.location,
          image: property.image,
        },
        agentId: property.creatorUID,
      };

      const res = await axiosSecure.post(
        "/api/payment/create-checkout-session",
        { offer }
      );

      if (res.data?.url) {
        // Redirect to Stripe Checkout hosted page
        window.location.href = res.data.url;
      } else {
        throw new Error("No URL returned from Stripe session");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong while creating the payment session.",
      });
      console.error("Checkout session error:", err);
    }
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-100 p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error loading properties
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "Unknown error occurred"}
          </p>
          <button
            onClick={refetch}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (properties?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <FaClock className="text-4xl text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          No Purchased Properties
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Properties you've purchased will appear here. Check back after
          completing a purchase.
        </p>
        <button
          onClick={() => navigate("/all-properties")}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg"
        >
          Browse Properties
        </button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Your Purchased Properties
        </h1>
        <p className="text-gray-600">
          {properties?.length}{" "}
          {properties?.length === 1 ? "property" : "properties"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {properties?.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleDelete(property)}
                    className="p-2 bg-white/90 rounded-full btn hover:bg-white transition-colors shadow-md"
                    aria-label="Remove from wishlist"
                  >
                    <MdDelete className="text-primary text-lg" />
                  </button>
                </div>
                {/* <button
                  onClick={() => handleDelete(property)}
                  className="absolute ml-60 mt-5 btn btn-sm"
                >
                  <MdDelete className="text-error" size={30} />
                </button> */}
                <img
                  src={property.image || "/default-property.jpg"}
                  alt={property.title || "Property image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/default-property.jpg";
                  }}
                />
                <div className="absolute bottom-2 left-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {property.requestStatus}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {property.title || "Unknown Property"}
                </h3>

                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FaMapMarkerAlt className="mr-1 text-gray-500" />
                  <span>{property.location || "Location not specified"}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600 mb-3 text-sm">
                  <span className="flex items-center">
                    <FaHome className="mr-1" /> {property.propertyType}
                  </span>
                  <span className="flex items-center">
                    <FaUser className="mr-1" />{" "}
                    {property.creatorEmail?.split("@")[0] || "Owner"}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaBed className="mr-1" /> {property.bedrooms} beds
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaBath className="mr-1" /> {property.bathrooms} baths
                  </div>
                  <div className="text-sm text-gray-600">
                    {property.areaSize} sqft
                  </div>
                </div>

                <div className="flex items-center text-gray-800 mb-4">
                  <FaMoneyBillWave className="mr-1 text-primary" />
                  <span className="font-medium">
                    Purchased for: $
                    {(
                      property.userRequestDetails?.offerAmount ||
                      property.minPrice
                    )?.toLocaleString()}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(property._id)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm"
                  >
                    View Details
                  </button>

                  {property.soldStatus === "false" && (
                    <button
                      onClick={() => handlePayment(property)}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 btn rounded-lg text-sm flex items-center justify-center"
                    >
                      <FaCreditCard className="mr-1" /> Complete Payment
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserBought;
