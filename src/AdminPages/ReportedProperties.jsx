import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaTrash, 
  FaExclamationTriangle, 
  FaCheck, 
  FaTimes,
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock data for reported properties
const mockReports = [
  {
    id: 1,
    property: {
      title: "Luxury Beachfront Villa",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      agent: "John Smith",
      agentEmail: "john.smith@havenspace.com"
    },
    reportedBy: {
      name: "Alex Johnson",
      email: "alex.j@example.com"
    },
    reason: "Suspected Fraud",
    message: "The price seems too good to be true for this location. I think it might be a scam.",
    dateReported: "2023-06-15T10:30:00",
    status: "Pending"
  },
  {
    id: 2,
    property: {
      title: "Downtown Loft Apartment",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      agent: "Sarah Williams",
      agentEmail: "sarah.w@havenspace.com"
    },
    reportedBy: {
      name: "Michael Brown",
      email: "michael.b@example.com"
    },
    reason: "Inappropriate Content",
    message: "The photos contain offensive artwork in the background.",
    dateReported: "2023-06-12T14:45:00",
    status: "Pending"
  },
  {
    id: 3,
    property: {
      title: "Suburban Family Home",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      agent: "Robert Davis",
      agentEmail: "robert.d@havenspace.com"
    },
    reportedBy: {
      name: "Emily Wilson",
      email: "emily.w@example.com"
    },
    reason: "Outdated Information",
    message: "This property was sold last month but still appears as available.",
    dateReported: "2023-06-08T09:15:00",
    status: "Reviewed"
  },
  {
    id: 4,
    property: {
      title: "Mountain View Cabin",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      agent: "Lisa Johnson",
      agentEmail: "lisa.j@havenspace.com"
    },
    reportedBy: {
      name: "David Thompson",
      email: "david.t@example.com"
    },
    reason: "Incorrect Details",
    message: "The square footage listed is significantly larger than the actual property.",
    dateReported: "2023-06-05T16:20:00",
    status: "Resolved"
  }
];

const ReportedProperties = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  // Filter reports based on search and status filter
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports?.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Handle actions
  const handleRemoveProperty = (id) => {
    // In a real app, this would make an API call
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'Resolved' } : report
    ));
    toast.success('Property removed successfully!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleWarnAgent = (agentEmail) => {
    // In a real app, this would send a warning to the agent
    toast.warn(`Warning sent to ${agentEmail}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleIgnoreReport = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'Resolved' } : report
    ));
    toast.info('Report marked as resolved', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleViewProperty = () => {
    toast.info('Opening property details...', {
      position: "top-right",
      autoClose: 2000,
    });
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
          Reported Properties
        </h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties or reporters..."
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
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {currentReports.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: '#9ACBD0' }}>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Property</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Reported By</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Agent</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Date Reported</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReports.map((report) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img className="h-16 w-16 rounded-lg object-cover" src={report.property.image} alt={report.property.title} />
                          </div>
                          <div className="ml-4 min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: '#006A71' }}>{report.property.title}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Reported By Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm font-medium truncate" style={{ color: '#006A71' }}>{report.reportedBy.name}</div>
                        <div className="text-sm truncate" style={{ color: '#48A6A7' }}>{report.reportedBy.email}</div>
                      </td>
                      
                      {/* Agent Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm font-medium truncate" style={{ color: '#006A71' }}>{report.property.agent}</div>
                        <div className="text-sm truncate" style={{ color: '#48A6A7' }}>{report.property.agentEmail}</div>
                      </td>
                      
                      {/* Reason Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm font-medium" style={{ color: '#006A71' }}>{report.reason}</div>
                        <div className="text-sm text-gray-500 truncate">{report.message}</div>
                      </td>
                      
                      {/* Date Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {formatDateTime(report.dateReported)}
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleViewProperty(report.id)}
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#48A6A7',
                              border: '1px solid #48A6A7'
                            }}
                          >
                            <FaEye className="mr-1" /> View
                          </button>
                          <button
                            onClick={() => handleRemoveProperty(report.id)}
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#EF4444',
                              border: '1px solid #EF4444'
                            }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                          {report.status !== 'Resolved' && (
                            <>
                              <button
                                onClick={() => handleWarnAgent(report.property.agentEmail)}
                                className="flex items-center px-2 py-1 rounded-lg text-xs"
                                style={{ 
                                  backgroundColor: '#FFFFFF',
                                  color: '#F59E0B',
                                  border: '1px solid #F59E0B'
                                }}
                              >
                                <FaExclamationTriangle className="mr-1" /> Warn
                              </button>
                              <button
                                onClick={() => handleIgnoreReport(report.id)}
                                className="flex items-center px-2 py-1 rounded-lg text-xs"
                                style={{ 
                                  backgroundColor: '#FFFFFF',
                                  color: '#10B981',
                                  border: '1px solid #10B981'
                                }}
                              >
                                <FaCheck className="mr-1" /> Resolve
                              </button>
                            </>
                          )}
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
                No reported properties found
              </p>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No properties have been reported yet"}
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
          {currentReports.length > 0 ? (
            currentReports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img className="h-20 w-20 rounded-lg object-cover" src={report.property.image} alt={report.property.title} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium" style={{ color: '#006A71' }}>{report.property.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#006A71' }}>Reported By</p>
                      <p className="text-sm">{report.reportedBy.name} ({report.reportedBy.email})</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium" style={{ color: '#006A71' }}>Agent</p>
                      <p className="text-sm">{report.property.agent} ({report.property.agentEmail})</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium" style={{ color: '#006A71' }}>Reason</p>
                      <p className="text-sm">{report.reason}</p>
                      <p className="text-sm text-gray-500 mt-1">{report.message}</p>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm">
                        {formatDateTime(report.dateReported)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => handleViewProperty(report.id)}
                        className="flex items-center px-3 py-1 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#48A6A7',
                          border: '1px solid #48A6A7'
                        }}
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleRemoveProperty(report.id)}
                        className="flex items-center px-3 py-1 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#EF4444',
                          border: '1px solid #EF4444'
                        }}
                      >
                        <FaTrash className="mr-1" /> Remove
                      </button>
                      {report.status !== 'Resolved' && (
                        <>
                          <button
                            onClick={() => handleWarnAgent(report.property.agentEmail)}
                            className="flex items-center px-3 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#F59E0B',
                              border: '1px solid #F59E0B'
                            }}
                          >
                            <FaExclamationTriangle className="mr-1" /> Warn
                          </button>
                          <button
                            onClick={() => handleIgnoreReport(report.id)}
                            className="flex items-center px-3 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#10B981',
                              border: '1px solid #10B981'
                            }}
                          >
                            <FaCheck className="mr-1" /> Resolve
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg mb-2" style={{ color: '#006A71' }}>
                No reported properties found
              </p>
              <p className="text-gray-600 text-sm">
                {searchTerm || statusFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No properties have been reported yet"}
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
        {filteredReports.length > reportsPerPage && (
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

export default ReportedProperties;