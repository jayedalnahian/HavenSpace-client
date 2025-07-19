import React from "react";
import {
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaEye,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useRequestedProperties from "../CustomHooks/useRequestedProperties";
import useUpdateRequestStatus from "../CustomHooks/useUpdateRequestStatus";
import useAcceptPropertyRequest from "../CustomHooks/useAcceptPropertyRequest";

const RequestedProperties = () => {
  const { requestedProperties, isLoading, error, refetch } =
    useRequestedProperties("pending");
  const { mutate: updateRequestStatus } = useUpdateRequestStatus();
  
  const { mutate: acceptRequest, isLoading: isAccepting } =
    useAcceptPropertyRequest();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleRejectRequest = (userEmailToRemove, propertyId) => {
    updateRequestStatus({
      propertyId,
      requestStatus: "normal",
      userEmailToRemove,
    });
  };

  const handleAccept = (propertyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this property request",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#006A71",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptRequest(propertyId);
      }
    });
  };

  const handleEmailResponse = (email) => {
    window.location.href = `mailto:${email}`;
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <p className="text-[#006A71]">Loading property requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-md">
          <p className="text-red-500 mb-4">Error: {error.message}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 rounded-lg font-medium"
            style={{ backgroundColor: "#48A6A7", color: "#F2EFE7" }}
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
          Property Requests
        </h1>

        {/* Desktop View */}
        <div className="hidden md:block">
          {requestedProperties.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full divide-y divide-gray-200">
                <thead style={{ backgroundColor: "#9ACBD0" }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71]">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71]">
                      Requested By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71]">
                      Offer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71]">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requestedProperties.map((property) => {
                    // Find the request with user data (skipping empty objects)
                    const request = property.requestedUserData.find(
                      (item) => item && item.email
                    );

                    if (!request) return null;

                    return (
                      <motion.tr
                        key={property._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="h-16 w-16 rounded-lg object-cover mr-4"
                            />
                            <div>
                              <div className="text-sm font-medium text-[#006A71]">
                                {property.title}
                              </div>
                              <div className="text-sm text-[#48A6A7] flex items-center">
                                <FaMapMarkerAlt className="mr-1" size={12} />
                                {property.location}
                              </div>
                              <div className="text-sm">
                                ${property.minPrice} - ${property.maxPrice}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[#006A71]">
                            {request.name || request.email.split("@")[0]}
                          </div>
                          <div className="text-sm text-[#48A6A7]">
                            {request.email}
                          </div>
                          <div className="text-sm">
                            {request.phone || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="font-medium">
                            Offer: ${request.offerAmount}
                          </div>
                          <div className="flex items-center mt-1">
                            <FaCalendarAlt className="mr-2 text-[#9ACBD0]" />
                            {new Date(
                              request.selectedDate
                            ).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                              property.requestStatus
                            )}`}
                          >
                            {property.requestStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {property.requestStatus === "pending" && (
                              <>
                                <button
                                  onClick={() => handleAccept(property._id)}
                                  className="flex items-center px-3 py-1 rounded-lg text-xs font-medium"
                                  style={{
                                    backgroundColor: "#48A6A7",
                                    color: "#F2EFE7",
                                  }}
                                >
                                  <FaCheck className="mr-1" /> Accept
                                </button>
                                <button
                                  className="flex items-center px-3 py-1 rounded-lg text-xs font-medium"
                                  style={{
                                    backgroundColor: "#FFFFFF",
                                    color: "#006A71",
                                    border: "1px solid #006A71",
                                  }}
                                  onClick={() =>
                                    handleRejectRequest(
                                      request.email,
                                      property._id
                                    )
                                  }
                                >
                                  <FaTimes className="mr-1" /> Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleEmailResponse(request.email)}
                              className="flex items-center px-3 py-1 rounded-lg text-xs font-medium"
                              style={{
                                backgroundColor: "#9ACBD0",
                                color: "#006A71",
                              }}
                            >
                              <FaEnvelope className="mr-1" /> Email
                            </button>
                            <Link to={`/propertyDetails/${property._id}`}>
                              <button
                                className="flex items-center px-3 py-1 rounded-lg text-xs font-medium"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  color: "#48A6A7",
                                  border: "1px solid #48A6A7",
                                }}
                              >
                                <FaEye className="mr-1" /> View
                              </button>
                            </Link>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-lg mb-2 text-[#006A71]">
                No property requests found
              </p>
              <p className="text-gray-600">
                You have no property requests at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestedProperties;
