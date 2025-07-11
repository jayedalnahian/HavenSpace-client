import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaCheck, 
  FaEyeSlash, 
  FaTrash,
  FaStar,
  FaUser,
  FaHome,
  FaCalendarAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    reviewer: {
      name: "Alex Johnson",
      email: "alex.j@example.com"
    },
    property: {
      title: "Luxury Beachfront Villa",
      id: 101
    },
    rating: 5,
    content: "Absolutely stunning property with amazing ocean views. The amenities were top-notch and the location was perfect for our family vacation.",
    status: "Approved",
    dateSubmitted: "2023-06-15T10:30:00"
  },
  {
    id: 2,
    reviewer: {
      name: "Sarah Williams",
      email: "sarah.w@example.com"
    },
    property: {
      title: "Downtown Loft Apartment",
      id: 102
    },
    rating: 3,
    content: "The location was convenient but the apartment was noisier than expected. Some of the appliances were outdated.",
    status: "Pending",
    dateSubmitted: "2023-06-12T14:45:00"
  },
  {
    id: 3,
    reviewer: {
      name: "Michael Brown",
      email: "michael.b@example.com"
    },
    property: {
      title: "Suburban Family Home",
      id: 103
    },
    rating: 4,
    content: "Great neighborhood and spacious backyard. The kitchen could use some updates but overall we enjoyed our stay.",
    status: "Approved",
    dateSubmitted: "2023-06-08T09:15:00"
  },
  {
    id: 4,
    reviewer: {
      name: "Emily Wilson",
      email: "emily.w@example.com"
    },
    property: {
      title: "Mountain View Cabin",
      id: 104
    },
    rating: 1,
    content: "This property was not as advertised. The photos were misleading and the cabin was in poor condition.",
    status: "Hidden",
    dateSubmitted: "2023-06-05T16:20:00"
  },
  {
    id: 5,
    reviewer: {
      name: "David Thompson",
      email: "david.t@example.com"
    },
    property: {
      title: "Urban Penthouse",
      id: 105
    },
    rating: 5,
    content: "Exceptional property with breathtaking city views. The concierge service was outstanding!",
    status: "Pending",
    dateSubmitted: "2023-06-03T11:10:00"
  }
];

const ManageReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Filter reviews based on search and status filter
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Count reviews by status
  const reviewCounts = {
    all: reviews.length,
    approved: reviews.filter(r => r.status === 'Approved').length,
    hidden: reviews.filter(r => r.status === 'Hidden').length,
    pending: reviews.filter(r => r.status === 'Pending').length
  };

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Hidden':
        return 'bg-gray-100 text-gray-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Handle review actions
  const approveReview = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'Approved' } : review
    ));
    toast.success('Review approved and published!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const hideReview = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'Hidden' } : review
    ));
    toast.warn('Review hidden from public view', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const deleteReview = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
      toast.error('Review permanently deleted', {
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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < rating ? "text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
    );
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
          Manage Reviews
        </h1>

        {/* Review Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="text-2xl font-bold" style={{ color: '#006A71' }}>{reviewCounts.all}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-2xl font-bold text-green-600">{reviewCounts.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{reviewCounts.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Hidden</p>
            <p className="text-2xl font-bold text-gray-600">{reviewCounts.hidden}</p>
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
              placeholder="Search reviews by property or reviewer..."
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
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {currentReviews.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: '#9ACBD0' }}>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Reviewer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Property</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Review</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReviews.map((review) => (
                    <motion.tr
                      key={review.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={review.status === 'Pending' ? 'bg-yellow-50' : ''}
                    >
                      {/* Reviewer Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaUser className="mr-2" style={{ color: '#9ACBD0' }} />
                          <div>
                            <div className="text-sm font-medium" style={{ color: '#006A71' }}>{review.reviewer.name}</div>
                            <div className="text-sm" style={{ color: '#48A6A7' }}>{review.reviewer.email}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaHome className="mr-2" style={{ color: '#9ACBD0' }} />
                          <div className="text-sm font-medium" style={{ color: '#006A71' }}>{review.property.title}</div>
                        </div>
                      </td>
                      
                      {/* Rating Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>
                      
                      {/* Review Content Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm line-clamp-3">{review.content}</div>
                      </td>
                      
                      {/* Date Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {formatDateTime(review.dateSubmitted)}
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(review.status)}`}>
                          {review.status}
                        </span>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {review.status !== 'Approved' && (
                            <button
                              onClick={() => approveReview(review.id)}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#48A6A7',
                                color: '#F2EFE7'
                              }}
                            >
                              <FaCheck className="mr-1" /> Approve
                            </button>
                          )}
                          {review.status !== 'Hidden' && (
                            <button
                              onClick={() => hideReview(review.id)}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#FFFFFF',
                                color: '#006A71',
                                border: '1px solid #006A71'
                              }}
                            >
                              <FaEyeSlash className="mr-1" /> Hide
                            </button>
                          )}
                          <button
                            onClick={() => deleteReview(review.id)}
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
                No reviews found
              </p>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No reviews have been submitted yet"}
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
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl shadow-md overflow-hidden ${review.status === 'Pending' ? 'border-l-4 border-yellow-400' : ''}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium" style={{ color: '#006A71' }}>{review.property.title}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(review.status)}`}>
                          {review.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDateTime(review.dateSubmitted)}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#006A71' }}>Reviewer</p>
                      <p className="text-sm">{review.reviewer.name} ({review.reviewer.email})</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium" style={{ color: '#006A71' }}>Review</p>
                      <p className="text-sm">{review.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {review.status !== 'Approved' && (
                        <button
                          onClick={() => approveReview(review.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#48A6A7',
                            color: '#F2EFE7'
                          }}
                        >
                          <FaCheck className="mr-1" /> Approve
                        </button>
                      )}
                      {review.status !== 'Hidden' && (
                        <button
                          onClick={() => hideReview(review.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            color: '#006A71',
                            border: '1px solid #006A71'
                          }}
                        >
                          <FaEyeSlash className="mr-1" /> Hide
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
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
                No reviews found
              </p>
              <p className="text-gray-600 text-sm">
                {searchTerm || statusFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No reviews have been submitted yet"}
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
        {filteredReviews.length > reviewsPerPage && (
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

export default ManageReviews;