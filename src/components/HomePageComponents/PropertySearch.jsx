import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router";
import usePropertySearch from "../../CustomHooks/usePropertySearch";

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={property.image || "https://via.placeholder.com/400x300?text=Property+Image"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#006A71] mb-2 truncate">
          {property.title || "Untitled Property"}
        </h3>

        <div className="flex items-center text-[#48A6A7] mb-2">
          <FiMapPin className="mr-1" />
          <span className="truncate">{property.location || "Location not specified"}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaBed className="mr-1 text-[#48A6A7]" />
              <span>{property.bedrooms || 0}</span>
            </div>
            <span className="text-xs text-gray-500">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaBath className="mr-1 text-[#48A6A7]" />
              <span>{property.bathrooms || 0}</span>
            </div>
            <span className="text-xs text-gray-500">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaRulerCombined className="mr-1 text-[#48A6A7]" />
              <span>{property.areaSize ? `${property.areaSize} sqft` : "N/A"}</span>
            </div>
            <span className="text-xs text-gray-500">Area</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-[#006A71] font-medium">
            <FiDollarSign className="mr-1" />
            <span>
              {property.minPrice ? `$${property.minPrice.toLocaleString()}` : "N/A"} -{" "}
              {property.maxPrice ? `$${property.maxPrice.toLocaleString()}` : "N/A"}
            </span>
          </div>
          <span className="px-2 py-1 bg-[#9ACBD0] text-[#006A71] rounded text-xs">
            {property.propertyType || "Unknown"}
          </span>
        </div>

        <Link
          to={`/propertyDetails/${property._id}`}
          className="block w-full py-2 bg-[#48A6A7] hover:bg-[#006A71] text-white text-center rounded transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default function PropertySearch() {
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "Property Type",
    priceRange: "Price Range"
  });

  const { data: properties, isLoading, isError, refetch } = usePropertySearch(searchData);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    refetch();
  };

  return (
    <section className="w-full py-10 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <form onSubmit={handleSubmit} className="bg-[#F2EFE7] dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={searchData.location}
                onChange={handleInputChange}
                className="rounded-xl border border-[#9ACBD0] p-3 w-full 
                bg-white dark:bg-gray-700 
                text-[#006A71] dark:text-white 
                placeholder-[#48A6A7] dark:placeholder-gray-400
                focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent
                dark:border-gray-600"
              />

              <select
                name="propertyType"
                value={searchData.propertyType}
                onChange={handleInputChange}
                className="rounded-xl border border-[#9ACBD0] p-3 w-full
                bg-white dark:bg-gray-700
                text-[#006A71] dark:text-white
                focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent
                dark:border-gray-600"
              >
                <option value="Property Type" disabled>Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>

              <select
                name="priceRange"
                value={searchData.priceRange}
                onChange={handleInputChange}
                className="rounded-xl border border-[#9ACBD0] p-3 w-full
                bg-white dark:bg-gray-700
                text-[#006A71] dark:text-white
                focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent
                dark:border-gray-600"
              >
                <option value="Price Range" disabled>Price Range</option>
                <option value="$100k - $300k">$100k - $300k</option>
                <option value="$300k - $600k">$300k - $600k</option>
                <option value="$600k+">$600k+</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#006A71] text-white rounded-xl p-3 
                hover:bg-[#00555b] 
                dark:bg-[#48A6A7] dark:hover:bg-[#006A71]
                transition-colors duration-200 flex justify-center items-center gap-2
                disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="animate-pulse">Searching...</span>
                ) : (
                  <>
                    <FaSearch />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#006A71]">
              {hasSearched ? "Search Results" : "Featured Properties"}
            </h2>
            {Array.isArray(properties) && properties.length > 0 && (
              <p className="text-gray-600">{properties.length} properties found</p>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48A6A7]"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-10">
              <p className="text-red-500 text-lg">Error loading properties. Please try again.</p>
              <button
                onClick={refetch}
                className="mt-4 bg-[#006A71] text-white px-6 py-2 rounded-lg hover:bg-[#00555b] transition"
              >
                Retry
              </button>
            </div>
          ) : Array.isArray(properties) && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">
                No properties match your search criteria. Try different filters.
              </p>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">
                Use the search bar above to find properties.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}