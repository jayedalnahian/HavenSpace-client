import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaCheck, 
  FaTimes, 
  FaEdit, 
  FaTrash,
  FaHome,
  FaMapMarkerAlt,
  FaUser,
  FaDollarSign,
  FaCalendarAlt
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
    location: "Malibu, CA",
    price: 2500000,
    agent: {
      name: "John Smith",
      email: "john.smith@havenspace.com"
    },
    status: "Approved",
    dateListed: "2023-06-15T10:30:00"
  },
  {
    id: 2,
    title: "Downtown Loft Apartment",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    location: "New York, NY",
    price: 850000,
    agent: {
      name: "Sarah Williams",
      email: "sarah.w@havenspace.com"
    },
    status: "Pending",
    dateListed: "2023-06-12T14:45:00"
  },
  {
    id: 3,
    title: "Suburban Family Home",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    location: "Austin, TX",
    price: 650000,
    agent: {
      name: "Robert Davis",
      email: "robert.d@havenspace.com"
    },
    status: "Rejected",
    dateListed: "2023-06-08T09:15:00"
  },
  {
    id: 4,
    title: "Mountain View Cabin",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    location: "Aspen, CO",
    price: 1200000,
    agent: {
      name: "Lisa Johnson",
      email: "lisa.j@havenspace.com"
    },
    status: "Approved",
    dateListed: "2023-06-05T16:20:00"
  },
  {
    id: 5,
    title: "Urban Penthouse",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    location: "Chicago, IL",
    price: 3200000,
    agent: {
      name: "Michael Brown",
      email: "michael.b@havenspace.com"
    },
    status: "Pending",
    dateListed: "2023-06-03T11:10:00"
  }
];

const ManageProperties = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  // Filter properties based on search and status filter
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Count properties by status
  const propertyCounts = {
    all: properties.length,
    approved: properties.filter(p => p.status === 'Approved').length,
    rejected: properties.filter(p => p.status === 'Rejected').length,
    pending: properties.filter(p => p.status === 'Pending').length
  };

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Handle property actions
  const approveProperty = (id) => {
    if (window.confirm('Are you sure you want to approve this property?')) {
      setProperties(properties.map(property => 
        property.id === id ? { ...property, status: 'Approved' } : property
      ));
      toast.success('Property approved!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const rejectProperty = (id) => {
    if (window.confirm('Are you sure you want to reject this property?')) {
      setProperties(properties.map(property => 
        property.id === id ? { ...property, status: 'Rejected' } : property
      ));
      toast.warn('Property rejected', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const editProperty = (id) => {
    // In a real app, this would navigate to edit page or open modal
    toast.info(`Editing property ${id}...`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const deleteProperty = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this property?')) {
      setProperties(properties.filter(property => property.id !== id));
      toast.error('Property deleted', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6" 
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 
          className="text-2xl md:text-3xl font-bold mb-6" 
          style={{ color: '#006A71' }}
        >
          Manage Properties
        </h1>

        {/* Property Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Total Properties</p>
            <p className="text-2xl font-bold" style={{ color: '#006A71' }}>{propertyCounts.all}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-2xl font-bold text-green-600">{propertyCounts.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{propertyCounts.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{propertyCounts.rejected}</p>
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
              placeholder="Search properties or agents..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
              style={{ backgroundColor: '#FFFFFF' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {currentProperties.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: '#9ACBD0' }}>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Property</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Agent</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Listed</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProperties.map((property) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={property.status === 'Pending' ? 'bg-yellow-50' : ''}
                    >
                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img className="h-16 w-16 rounded-lg object-cover" src={property.image} alt={property.title} />
                          </div>
                          <div className="ml-4 min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: '#006A71' }}>{property.title}</div>
                          </div>
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
                      
                      {/* Agent Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaUser className="mr-2" style={{ color: '#9ACBD0' }} />
                          <div>
                            <div className="text-sm truncate">{property.agent.name}</div>
                            <div className="text-xs truncate" style={{ color: '#48A6A7' }}>{property.agent.email}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Date Listed Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {formatDateTime(property.dateListed)}
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(property.status)}`}>
                          {property.status}
                        </span>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {property.status !== 'Approved' && (
                            <button
                              onClick={() => approveProperty(property.id)}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#48A6A7',
                                color: '#F2EFE7'
                              }}
                            >
                              <FaCheck className="mr-1" /> Approve
                            </button>
                          )}
                          {property.status !== 'Rejected' && (
                            <button
                              onClick={() => rejectProperty(property.id)}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#FFFFFF',
                                color: '#EF4444',
                                border: '1px solid #EF4444'
                              }}
                            >
                              <FaTimes className="mr-1" /> Reject
                            </button>
                          )}
                          <button
                            onClick={() => editProperty(property.id)}
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#006A71',
                              border: '1px solid #006A71'
                            }}
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => deleteProperty(property.id)}
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#EF4444',
                              border: '1px solid #EF4444'
                            }}
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
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
                  : "No properties have been listed yet"}
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
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl shadow-md overflow-hidden ${property.status === 'Pending' ? 'border-l-4 border-yellow-400' : ''}`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img className="h-20 w-20 rounded-lg object-cover" src={property.image} alt={property.title} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium" style={{ color: '#006A71' }}>{property.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(property.status)}`}>
                          {property.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center">
                      <FaDollarSign className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm font-semibold">${property.price.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center">
                      <FaUser className="mr-2" style={{ color: '#9ACBD0' }} />
                      <div>
                        <span className="text-sm">{property.agent.name}</span>
                        <div className="text-xs" style={{ color: '#48A6A7' }}>{property.agent.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm">
                        {formatDateTime(property.dateListed)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {property.status !== 'Approved' && (
                        <button
                          onClick={() => approveProperty(property.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#48A6A7',
                            color: '#F2EFE7'
                          }}
                        >
                          <FaCheck className="mr-1" /> Approve
                        </button>
                      )}
                      {property.status !== 'Rejected' && (
                        <button
                          onClick={() => rejectProperty(property.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            color: '#EF4444',
                            border: '1px solid #EF4444'
                          }}
                        >
                          <FaTimes className="mr-1" /> Reject
                        </button>
                      )}
                      <button
                        onClick={() => editProperty(property.id)}
                        className="flex items-center px-3 py-1 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#006A71',
                          border: '1px solid #006A71'
                        }}
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => deleteProperty(property.id)}
                        className="flex items-center px-3 py-1 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#EF4444',
                          border: '1px solid #EF4444'
                        }}
                      >
                        <FaTrash className="mr-1" /> Delete
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
                  : "No properties have been listed yet"}
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
        {filteredProperties.length > propertiesPerPage && (
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
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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

export default ManageProperties;