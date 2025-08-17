import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaSearch, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { FiMapPin, FiDollarSign, FiHome } from "react-icons/fi";
import useAllApprovedPropertys from "../../CustomHooks/useAllApprovedPropertys";
import LoadingSpinner from "../../components/LoadingSpinner";

const propertyCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      variants={propertyCardVariants}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={property.image || "https://via.placeholder.com/400x300?text=HavenSpace"}
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
              {property.minPrice ? `$${property.minPrice.toLocaleString()}` : "N/A"} - {" "}
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

const AllPropertiesPage = () => {
  const { properties = [], isLoading, error, refetch } = useAllApprovedPropertys();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "Property Type",
    priceRange: "Price Range",
  });

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let results = properties;

    if (searchData.location) {
      results = results.filter((p) =>
        p.location?.toLowerCase().includes(searchData.location.toLowerCase())
      );
    }

    if (searchData.propertyType !== "Property Type") {
      results = results.filter((p) => p.propertyType === searchData.propertyType);
    }

    if (searchData.priceRange !== "Price Range") {
      if (searchData.priceRange === "$100k - $300k") {
        results = results.filter((p) => p.minPrice >= 100000 && p.maxPrice <= 300000);
      } else if (searchData.priceRange === "$300k - $600k") {
        results = results.filter((p) => p.minPrice >= 300000 && p.maxPrice <= 600000);
      } else if (searchData.priceRange === "$600k+") {
        results = results.filter((p) => p.minPrice >= 600000);
      }
    }

    setFilteredProperties(results);

    setSearchData({
      location: "",
      propertyType: "Property Type",
      priceRange: "Price Range",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F2EFE7] flex items-center justify-center p-8">
        <LoadingSpinner color="#48A6A7" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F2EFE7] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#006A71] mb-4">Error Loading Properties</h2>
          <p className="text-[#48A6A7] mb-6">{error.message}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-[#48A6A7] hover:bg-[#006A71] text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EFE7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="bg-[#F2EFE7] dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={searchData.location}
              onChange={handleInputChange}
              className="rounded-xl border border-[#9ACBD0] p-3 w-full bg-white"
            />

            <select
              name="propertyType"
              value={searchData.propertyType}
              onChange={handleInputChange}
              className="rounded-xl border border-[#9ACBD0] p-3 w-full bg-white"
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
              className="rounded-xl border border-[#9ACBD0] p-3 w-full bg-white"
            >
              <option value="Price Range" disabled>Price Range</option>
              <option value="$100k - $300k">$100k - $300k</option>
              <option value="$300k - $600k">$300k - $600k</option>
              <option value="$600k+">$600k+</option>
            </select>

            <button
              type="submit"
              className="bg-[#006A71] text-white rounded-xl p-3 hover:bg-[#00555b] transition-colors duration-200 flex justify-center items-center gap-2"
            >
              <FaSearch /> Search
            </button>
          </div>
        </form>

        {/* Results Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#006A71] mb-2">
            {filteredProperties?.length > 0 ? "Available Properties" : "No Properties Found"}
          </h1>
          <p className="text-[#48A6A7]">
            {filteredProperties?.length > 0
              ? `Showing ${filteredProperties.length} properties`
              : "Try adjusting your search criteria"}
          </p>
        </div>

        {filteredProperties?.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <FiHome className="mx-auto text-6xl text-[#48A6A7] mb-4" />
            <h3 className="text-xl font-semibold text-[#006A71] mb-2">No Properties Available</h3>
            <p className="text-[#48A6A7]">Check back later for new listings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPropertiesPage;
