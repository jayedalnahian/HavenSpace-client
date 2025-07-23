import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaBullhorn, 
  FaTimes, 
  FaCheck,
  FaMapMarkerAlt,
  FaUser,
  FaDollarSign,
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    agent: "John Smith",
    location: "Malibu, CA",
    price: 2500000,
    advertised: true,
    featured: true
  },
  {
    id: 2,
    title: "Downtown Loft Apartment",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    agent: "Sarah Williams",
    location: "New York, NY",
    price: 850000,
    advertised: false,
    featured: false
  },
  {
    id: 3,
    title: "Suburban Family Home",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    agent: "Robert Davis",
    location: "Austin, TX",
    price: 650000,
    advertised: true,
    featured: false
  },
  {
    id: 4,
    title: "Mountain View Cabin",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    agent: "Lisa Johnson",
    location: "Aspen, CO",
    price: 1200000,
    advertised: false,
    featured: false
  },
  {
    id: 5,
    title: "Urban Penthouse",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    agent: "Michael Brown",
    location: "Chicago, IL",
    price: 3200000,
    advertised: true,
    featured: true
  },
  {
    id: 6,
    title: "Countryside Estate",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    agent: "Emily Wilson",
    location: "Napa Valley, CA",
    price: 4500000,
    advertised: false,
    featured: false
  }
];

const AdvertiseProperties = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  // Filter properties based on search and status filter
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Advertised' && property.advertised) || 
                         (statusFilter === 'Not Advertised' && !property.advertised);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties?.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties?.length / propertiesPerPage);

  // Count advertised properties
  const advertisedCount = properties.filter(p => p.advertised)?.length;

  // Toggle advertise status
  const toggleAdvertise = (id) => {
    setProperties(properties?.map(property => 
      property.id === id ? { ...property, advertised: !property.advertised } : property
    ));
    
    const property = properties.find(p => p.id === id);
    const action = property.advertised ? "removed from" : "added to";
    
    toast.success(`Property ${action} advertised listings!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Bulk toggle advertise status
  const bulkToggleAdvertise = (advertise) => {
    setProperties(properties?.map(property => ({
      ...property,
      advertised: advertise
    })));
    
    toast.success(`All properties ${advertise ? "added to" : "removed from"} advertised listings!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6" 
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 
            className="text-2xl md:text-3xl font-bold mb-4 md:mb-0" 
            style={{ color: '#006A71' }}
          >
            Advertise Properties
          </h1>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-lg flex items-center" style={{ backgroundColor: '#9ACBD0', color: '#006A71' }}>
              <FaStar className="mr-2" />
              <span className="font-medium">{advertisedCount} Advertised</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties, agents, or locations..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
              style={{ backgroundColor: '#FFFFFF' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7] appearance-none"
                style={{ backgroundColor: '#FFFFFF' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Advertised">Advertised</option>
                <option value="Not Advertised">Not Advertised</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => bulkToggleAdvertise(true)}
                className="px-3 py-2 rounded-lg text-sm flex items-center"
                style={{ 
                  backgroundColor: '#48A6A7',
                  color: '#F2EFE7'
                }}
              >
                <FaCheck className="mr-1" /> Advertise All
              </button>
              <button
                onClick={() => bulkToggleAdvertise(false)}
                className="px-3 py-2 rounded-lg text-sm flex items-center"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#006A71',
                  border: '1px solid #006A71'
                }}
              >
                <FaTimes className="mr-1" /> Remove All
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {currentProperties?.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: '#9ACBD0' }}>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Property</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Agent</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProperties?.map((property) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img className="h-16 w-16 rounded-lg object-cover" src={property.image} alt={property.title} />
                          </div>
                          <div className="ml-4 min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: '#006A71' }}>{property.title}</div>
                            {property.featured && (
                              <div className="flex items-center mt-1">
                                <FaStar className="text-yellow-500 mr-1" size={12} />
                                <span className="text-xs text-yellow-700">Featured</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      {/* Agent Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaUser className="mr-2" style={{ color: '#9ACBD0' }} />
                          <span className="text-sm truncate">{property.agent}</span>
                        </div>
                      </td>
                      
                      {/* Location Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" style={{ color: '#9ACBD0' }} />
                          <span className="text-sm truncate">{property.location}</span>
                        </div>
                      </td>
                      
                      {/* Price Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaDollarSign className="mr-1" style={{ color: '#9ACBD0' }} />
                          <span className="text-sm font-semibold">${property.price.toLocaleString()}</span>
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${property.advertised ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {property.advertised ? 'Advertised' : 'Not Advertised'}
                        </span>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAdvertise(property.id)}
                          className={`px-3 py-1 rounded-lg text-sm flex items-center ${property.advertised ? 'bg-red-100 text-red-700' : 'bg-[#48A6A7] text-[#F2EFE7]'}`}
                        >
                          {property.advertised ? (
                            <>
                              <FaTimes className="mr-1" /> Remove
                            </>
                          ) : (
                            <>
                              <FaBullhorn className="mr-1" /> Advertise
                            </>
                          )}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-xl mb-2" style={{ color: '#006A71' }}>
                No properties found
              </p>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No properties available to advertise"}
              </p>
              {(searchTerm || statusFilter !== 'All') && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: '#48A6A7',
                    color: '#F2EFE7'
                  }}
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('All');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentProperties?.length > 0 ? (
            currentProperties?.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img className="h-20 w-20 rounded-lg object-cover" src={property.image} alt={property.title} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium" style={{ color: '#006A71' }}>{property.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${property.advertised ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {property.advertised ? 'Advertised' : 'Not Advertised'}
                        </span>
                        {property.featured && (
                          <div className="flex items-center ml-2">
                            <FaStar className="text-yellow-500 mr-1" size={12} />
                            <span className="text-xs text-yellow-700">Featured</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center">
                      <FaUser className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm">{property.agent}</span>
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center">
                      <FaDollarSign className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm font-semibold">${property.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => toggleAdvertise(property.id)}
                        className={`px-4 py-2 rounded-lg text-sm flex items-center ${property.advertised ? 'bg-red-100 text-red-700' : 'bg-[#48A6A7] text-[#F2EFE7]'}`}
                      >
                        {property.advertised ? (
                          <>
                            <FaTimes className="mr-1" /> Remove from Ads
                          </>
                        ) : (
                          <>
                            <FaBullhorn className="mr-1" /> Advertise Property
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg mb-2" style={{ color: '#006A71' }}>
                No properties found
              </p>
              <p className="text-gray-600 text-sm">
                {searchTerm || statusFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No properties available to advertise"}
              </p>
              {(searchTerm || statusFilter !== 'All') && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: '#48A6A7',
                    color: '#F2EFE7'
                  }}
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('All');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProperties?.length > propertiesPerPage && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full disabled:opacity-50"
                style={{ 
                  backgroundColor: currentPage === 1 ? '#9ACBD0' : '#48A6A7',
                  color: '#F2EFE7'
                }}
              >
                <FaChevronLeft />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full ${currentPage === page ? 'bg-[#006A71] text-white' : 'bg-[#9ACBD0] text-[#006A71]'}`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full disabled:opacity-50"
                style={{ 
                  backgroundColor: currentPage === totalPages ? '#9ACBD0' : '#48A6A7',
                  color: '#F2EFE7'
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseProperties;