import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useHomePagePropertys from "../../CustomHooks/useHomePagePropertys";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  // Add null checks for property and its properties
  if (!property) return null;

  const isVerified = property?.availability !== "Sold";
  const priceRange = property?.minPrice && property?.maxPrice 
    ? `$${property.minPrice.toLocaleString()} - $${property.maxPrice.toLocaleString()}`
    : 'Price not available';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property?.image || '/placeholder-property.jpg'}
          alt={property?.title || 'Property image'}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#006A71] text-white px-2 py-1 rounded-md text-xs font-semibold">
          {property?.propertyType || 'Property'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[#006A71] font-bold text-lg mb-1 truncate">
          {property?.title || 'Untitled Property'}
        </h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
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
          {property?.location || 'Location not specified'}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-[#48A6A7] font-bold">{priceRange}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              isVerified
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {property?.availability || 'Availability unknown'}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {property?.features?.length > 0 ? (
            property.features.map((feature, index) => (
              <span
                key={index}
                className="bg-[#9ACBD0] text-[#006A71] px-2 py-1 rounded-full text-xs"
              >
                {feature}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">No features listed</span>
          )}
        </div>

        <button
          onClick={() => navigate(`/propertyDetails/${property?._id || ''}`)}
          className="w-full bg-[#48A6A7] hover:bg-[#006A71] text-white py-2 rounded-md transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const FeaturedListings = () => {
  const { properties, isLoading, error } = useHomePagePropertys();
  

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F2EFE7]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#006A71] mb-2">
            🏡 Featured Listings
          </h2>
          <p className="text-[#48A6A7] max-w-2xl mx-auto">
            Discover your perfect home from our curated selection of premium
            properties
          </p>
        </motion.div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            Failed to load properties. Please try again later.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <LoadingSkeleton key={index} />)
          ) : properties?.length > 0 ? (
            properties.slice(0, 4).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            !error && (
              <div className="col-span-4 text-center py-8">
                No properties available at the moment.
              </div>
            )
          )}
        </div>

        {!isLoading && properties?.length > 4 && (
          <div className="text-center mt-8">
            <button className="bg-[#9ACBD0] hover:bg-[#48A6A7] text-[#006A71] font-semibold py-2 px-6 rounded-full transition-colors duration-300">
              View All Properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;