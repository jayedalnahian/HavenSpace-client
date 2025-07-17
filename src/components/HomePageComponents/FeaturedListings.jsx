import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAllProperties from '../../CustomHooks/useAllProperties';

// Custom hook for fetching properties (mock implementation)
// const useAllProperties = () => {
//   // In a real app, this would fetch from an API
//   const properties = [
//     {
//       "_id": "68711b4adb2ae2e5a38b7b74",
//       "title": "Deleniti natus aliqu",
//       "description": "Quia commodo totam p dfgdg  dfgd dfgb fg",
//       "location": "Eos quia consequatur",
//       "minPrice": 1722,
//       "maxPrice": 1894,
//       "bedrooms": 92,
//       "bathrooms": 71,
//       "areaSize": 68,
//       "propertyType": "Commercial",
//       "features": ["Garage", "Swimming Pool", "Furnished", "Parking", "Security"],
//       "image": "https://i.ibb.co/jktgBHyd/20250211-153809.jpg",
//       "availability": "Sold",
//       "agentName": null,
//       "agentEmail": "nahian@gmail.com",
//       "agentId": "ZCe5BOpQEOb7ofKVYhxIlP1XcxR2",
//       "createdAt": "2025-07-11T14:10:18.502Z"
//     },
//     {
//       "_id": "68711c99639090b3faebd8e9",
//       "title": "Modern Family Home",
//       "description": "Spacious modern home with all essential facilities.",
//       "location": "Dhanmondi, Dhaka",
//       "minPrice": 95000,
//       "maxPrice": 120000,
//       "bedrooms": 4,
//       "bathrooms": 3,
//       "areaSize": 2200,
//       "propertyType": "Apartment",
//       "features": ["Balcony", "Security", "Parking"],
//       "image": "https://i.ibb.co/z6pYjYm/home1.jpg",
//       "availability": "Available",
//       "agentName": "Jane Smith",
//       "agentEmail": "jane@example.com",
//       "agentId": "a1b2c3d4e5f6g7",
//       "createdAt": "2025-07-11T10:15:00.000Z"
//     },
//     {
//       "_id": "68711c99639090b3faebd8e8",
//       "title": "Luxury Villa with Ocean View",
//       "description": "Stunning villa with panoramic ocean views and private beach access.",
//       "location": "Cox's Bazar",
//       "minPrice": 250000,
//       "maxPrice": 300000,
//       "bedrooms": 5,
//       "bathrooms": 4,
//       "areaSize": 3500,
//       "propertyType": "Villa",
//       "features": ["Swimming Pool", "Garden", "Security", "Beach Access"],
//       "image": "https://i.ibb.co/0jq7R0y/villa.jpg",
//       "availability": "Available",
//       "agentName": "John Doe",
//       "agentEmail": "john@example.com",
//       "agentId": "h8i9j0k1l2m3n4",
//       "createdAt": "2025-07-10T08:30:00.000Z"
//     },
//     {
//       "_id": "68711c99639090b3faebd8e7",
//       "title": "Cozy Studio Apartment",
//       "description": "Perfect for singles or couples in the heart of the city.",
//       "location": "Gulshan, Dhaka",
//       "minPrice": 45000,
//       "maxPrice": 50000,
//       "bedrooms": 1,
//       "bathrooms": 1,
//       "areaSize": 650,
//       "propertyType": "Studio",
//       "features": ["Furnished", "Security", "Parking"],
//       "image": "https://i.ibb.co/7QYfXJ3/studio.jpg",
//       "availability": "Available",
//       "agentName": "Sarah Johnson",
//       "agentEmail": "sarah@example.com",
//       "agentId": "o5p6q7r8s9t0u1",
//       "createdAt": "2025-07-09T14:45:00.000Z"
//     }
//   ];
  
//   return {
//     properties,
//     isLoading: false,
//     error: null,
//     refetch: () => {}
//   };
// };

const PropertyCard = ({ property }) => {
  
  const navigate = useNavigate();
  
  const isVerified = property.availability !== "Sold";
  const priceRange = `$${property.minPrice.toLocaleString()} - $${property.maxPrice.toLocaleString()}`;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#006A71] text-white px-2 py-1 rounded-md text-xs font-semibold">
          {property.propertyType}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-[#006A71] font-bold text-lg mb-1 truncate">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-[#48A6A7] font-bold">{priceRange}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {property.availability}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {property.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-[#9ACBD0] text-[#006A71] px-2 py-1 rounded-full text-xs">
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="bg-[#F2EFE7] text-[#006A71] px-2 py-1 rounded-full text-xs">
              +{property.features.length - 3}
            </span>
          )}
        </div>
        
        <button
          onClick={() => navigate(`/property/${property._id}`)}
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
  const { properties, isLoading, error, refetch} = useAllProperties()
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F2EFE7]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#006A71] mb-2">🏡 Featured Listings</h2>
          <p className="text-[#48A6A7] max-w-2xl mx-auto">
            Discover your perfect home from our curated selection of premium properties
          </p>
        </motion.div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            Failed to load properties. Please try again later.
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : (
            properties.slice(0, 4).map(property => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
        
        {!isLoading && properties.length > 4 && (
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