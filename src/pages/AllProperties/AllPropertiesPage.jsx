import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiHome, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import useAllProperties from '../../CustomHooks/useAllProperties';
import LoadingSpinner from '../../components/LoadingSpinner';

const propertyCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      variants={propertyCardVariants}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={property.image || 'https://via.placeholder.com/400x300?text=HavenSpace'} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#006A71] mb-2 truncate">{property.title}</h3>
        
        <div className="flex items-center text-[#48A6A7] mb-2">
          <FiMapPin className="mr-1" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaBed className="mr-1 text-[#48A6A7]" />
              <span>{property.bedrooms}</span>
            </div>
            <span className="text-xs text-gray-500">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaBath className="mr-1 text-[#48A6A7]" />
              <span>{property.bathrooms}</span>
            </div>
            <span className="text-xs text-gray-500">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaRulerCombined className="mr-1 text-[#48A6A7]" />
              <span>{property.areaSize}</span>
            </div>
            <span className="text-xs text-gray-500">Sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-[#006A71] font-medium">
            <FiDollarSign className="mr-1" />
            <span>
              {property.minPrice.toLocaleString()} - {property.maxPrice.toLocaleString()}
            </span>
          </div>
          <span className="px-2 py-1 bg-[#9ACBD0] text-[#006A71] rounded text-xs">
            {property.propertyType}
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
  const { properties = [], isLoading, error, refetch } = useAllProperties();

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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#006A71] mb-2">Discover Your Perfect Haven</h1>
          <p className="text-[#48A6A7]">Browse our collection of available properties</p>
        </div>

        {properties.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties.map(property => (
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