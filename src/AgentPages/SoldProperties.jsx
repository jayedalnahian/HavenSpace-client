import React from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useRequestedProperties from "../CustomHooks/useRequestedProperties";

const SoldProperties = () => {
  const { requestedProperties, isLoading, isError, error } = useRequestedProperties("accepted");

  if (isLoading) {
    return <div className="text-center text-xl p-6">Loading properties...</div>;
  }

  if (isError) {
    return <div className="text-center text-xl text-red-500 p-6">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-[#F2EFE7]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#006A71] mb-6">Accepted Properties</h1>

        {requestedProperties && requestedProperties?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requestedProperties?.map((property) => {
              const buyer = property.requestedUserData?.[0] || {};
              return (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#9ACBD0]"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-xl font-bold text-[#006A71] mb-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-[#9ACBD0]" />
                      {property.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-1 flex items-center">
                      <FaUser className="mr-2 text-[#9ACBD0]" />
                      {buyer.name || "Buyer"} ({buyer.email || "No email"})
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <p className="text-sm text-gray-500">Offer Amount</p>
                        <p className="text-lg font-bold text-[#006A71]">
                          ${buyer.offerAmount || property.minPrice || "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">List Price</p>
                        <p className="text-sm text-[#006A71]">
                          ${property.maxPrice || property.minPrice || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-2 border-t">
                      <span className="text-sm text-[#006A71] flex items-center">
                        <FaCalendarAlt className="mr-2 text-[#9ACBD0]" />
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                      <Link 
                        to={`/propertyDetails/${property._id}`} 
                        className="text-sm bg-[#48A6A7] text-white px-3 py-1 rounded-lg hover:bg-[#006A71]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-xl text-[#006A71] mb-2">No accepted properties found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoldProperties;