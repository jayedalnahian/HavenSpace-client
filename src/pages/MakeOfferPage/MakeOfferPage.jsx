import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { MdLocationOn, MdPerson, MdAttachMoney } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import useSingleProperty from "../../CustomHooks/useSingleProperty";
import useAuth from "../../CustomHooks/useAuth";
import Swal from "sweetalert2";
import usePostMakeOffer from "../../CustomHooks/usePostMakeOffer";

const MakeOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // Get authenticated user
  const { property, isLoading, error: propertyError } = useSingleProperty(id);
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [formError, setFormError] = useState("");
  const { makeOffer, isPending } = usePostMakeOffer();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate offer amount is within range
    if (
      parseFloat(offerAmount) < property.minPrice ||
      parseFloat(offerAmount) > property.maxPrice
    ) {
      setFormError(
        `Offer must be between $${property.minPrice.toLocaleString()} and $${property.maxPrice.toLocaleString()}`
      );
      return;
    }

    // Validate buying date is in the future
    const today = new Date();
    const selectedDate = new Date(buyingDate);
    if (selectedDate <= today) {
      setFormError("Buying date must be in the future");
      return;
    }

    // Prepare the offer data
    const offerData = {
      property: {
        _id: property._id,
        title: property.title,
        location: property.location,
        image: property.image,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      },
      buyer: {
        id: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        phone: currentUser.phoneNumber || "N/A",
      },
      offerDetails: {
        amount: parseFloat(offerAmount),
        buyingDate,
        message: "Offer submitted through website",
      },
      requestDate: new Date().toISOString(),
      status: "Pending",
      agentId: property.agentId,
      agentEmail: property.agentEmail,
    };
    makeOffer(offerData);
    navigate("/dashboard/wishlist");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary rounded-full mb-2"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (propertyError || !property) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {propertyError ||
              "The property you're trying to make an offer on couldn't be found."}
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Make an Offer
        </h1>
        <p className="text-gray-600">
          Complete the form below to submit your offer for this property
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {property.title}
              </h2>
              <div className="flex items-center text-gray-600 mb-3">
                <MdLocationOn className="mr-1 text-gray-500" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <MdPerson className="mr-1 text-gray-500" />
                <span>
                  Agent:{" "}
                  {property.agentEmail?.split("@")[0] ||
                    property.agentName ||
                    "Unknown"}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Price Range:</p>
                <p className="font-medium text-primary">
                  ${property.minPrice?.toLocaleString() || "0"} - $
                  {property.maxPrice?.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Readonly Property Info */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Property Title
              </label>
              <input
                type="text"
                value={property.title || ""}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Property Location
              </label>
              <input
                type="text"
                value={property.location || ""}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Agent Name
              </label>
              <input
                type="text"
                value={
                  property.agentEmail?.split("@")[0] ||
                  property.agentName ||
                  "Unknown"
                }
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
              />
            </div>

            {/* Buyer Info */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                value={currentUser?.displayName || "Not available"}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                value={currentUser?.email || "Not available"}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
              />
            </div>

            {/* Editable Fields */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <MdAttachMoney className="mr-1" /> Offer Amount ($)
              </label>
              <input
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                min={property.minPrice}
                max={property.maxPrice}
                step="0.01"
                placeholder={`Enter amount between $${
                  property.minPrice?.toLocaleString() || "0"
                } - $${property.maxPrice?.toLocaleString() || "0"}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaRegCalendarAlt className="mr-1" /> Buying Date
              </label>
              <input
                type="date"
                value={buyingDate}
                onChange={(e) => setBuyingDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          {formError && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {formError}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center"
            >
              {isPending ? "Submitting..." : "Submit Offer"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default MakeOfferPage;
