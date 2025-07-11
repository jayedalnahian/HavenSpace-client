// import { useQuery } from "@tanstack/react-query";
import React from "react";
// import useAxiosInterceptor from "../../CustomHooks/useAxiosInterceptor";
import { useParams } from "react-router";
import { FaBed, FaBath, FaRulerCombined, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import useSingleProperty from "../../CustomHooks/useSingleProperty";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { property, isLoading, error } = useSingleProperty(id)

//   const { data: property, isLoading, error } = useQuery({
//     queryKey: ["properties", id], // Include id in queryKey for proper caching
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/api/properties/${id}`);
//       return res.data;
//     },
//     staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//   });



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-text mb-4">Error Loading Property</h2>
          <p className="text-gray-600 mb-4">
            {error.message || "Failed to load property details. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-text mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The requested property could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Banner Image */}
      <div className="h-64 md:h-96 w-full overflow-hidden">
        <img
          src={property.image || "/default-property.jpg"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-text mb-2">{property.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MdLocationOn className="text-secondary mr-1" />
                <span>{property.location}</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-secondary bg-opacity-20 px-3 py-1 rounded-full">
                  <FaBed className="text-primary mr-2" />
                  <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                </div>
                <div className="flex items-center bg-secondary bg-opacity-20 px-3 py-1 rounded-full">
                  <FaBath className="text-primary mr-2" />
                  <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                </div>
                <div className="flex items-center bg-secondary bg-opacity-20 px-3 py-1 rounded-full">
                  <FaRulerCombined className="text-primary mr-2" />
                  <span>{property.areaSize} sq.ft</span>
                </div>
                <div className="flex items-center bg-secondary bg-opacity-20 px-3 py-1 rounded-full">
                  <span className="text-primary font-medium">{property.propertyType}</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text mb-2">Description</h2>
                <p className="text-gray-700">{property.description}</p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-text mb-2">Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Pricing & Agent */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text mb-2">Pricing</h2>
                <div className="text-2xl font-bold text-primary">
                  ${property.minPrice?.toLocaleString()}
                  {property.maxPrice && ` - $${property.maxPrice.toLocaleString()}`}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {property.availability || 'Availability not specified'}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text mb-2">Contact Agent</h2>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">
                      {property.agentName?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-text">{property.agentName || 'Agent'}</div>
                    <div className="text-sm text-gray-600">{property.agentEmail}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                  <FaEnvelope className="mr-2" />
                  Contact Agent
                </button>
                <button className="w-full bg-secondary hover:bg-secondary-dark text-text font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                  <FaPhone className="mr-2" />
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;