import React, { useState } from "react";
import {
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaSearch,
  FaEye,
  FaFilter,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestedPropertys = () => {
  // Mock data for property requests
  const initialRequests = [
    {
      id: 1,
      property: {
        title: "Luxury Beachfront Villa",
        location: "Malibu, CA",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 2500000,
      },
      buyer: {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        phone: "+1 (555) 123-4567",
      },
      requestDate: "2023-06-15",
      status: "Pending",
      message:
        "Interested in scheduling a viewing. Please contact me with available times.",
    },
    {
      id: 2,
      property: {
        title: "Downtown Loft Apartment",
        location: "New York, NY",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 850000,
      },
      buyer: {
        name: "Sarah Williams",
        email: "sarah.w@example.com",
        phone: "+1 (555) 987-6543",
      },
      requestDate: "2023-06-12",
      status: "Pending",
      message: "Would like to discuss possible negotiation on price.",
    },
    {
      id: 3,
      property: {
        title: "Suburban Family Home",
        location: "Austin, TX",
        image:
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 650000,
      },
      buyer: {
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "+1 (555) 456-7890",
      },
      requestDate: "2023-06-08",
      status: "Accepted",
      message: "Ready to proceed with purchase pending inspection.",
    },
    {
      id: 4,
      property: {
        title: "Mountain View Cabin",
        location: "Aspen, CO",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 1200000,
      },
      buyer: {
        name: "Emily Davis",
        email: "emily.d@example.com",
        phone: "+1 (555) 789-0123",
      },
      requestDate: "2023-06-01",
      status: "Rejected",
      message: "No longer interested in this property.",
    },
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  // Filter requests based on search and status filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.buyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handle status change
  const updateRequestStatus = (id, newStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );

    toast.success(`Request ${newStatus.toLowerCase()}!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Handle email response
  const handleEmailResponse = (buyerEmail) => {
    // In a real app, this would open email client or modal
    console.log(`Responding to ${buyerEmail}`);
    toast.info(`Email response would be sent to ${buyerEmail}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{ backgroundColor: "#F2EFE7" }}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: "#006A71" }}
        >
          Property Requests
        </h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties, locations, or buyers..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
              style={{ backgroundColor: "#FFFFFF" }}
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
              style={{ backgroundColor: "#FFFFFF" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        {/* Desktop Table View - Updated with scrolling container */}
        <div className="hidden md:block overflow-x-auto">
          {currentRequests.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: "#9ACBD0" }}>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Property
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Requested By
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Date
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Status
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "#006A71" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={request.property.image}
                              alt={request.property.title}
                            />
                          </div>
                          <div className="ml-4 min-w-0">
                            <div
                              className="text-sm font-medium truncate"
                              style={{ color: "#006A71" }}
                            >
                              {request.property.title}
                            </div>
                            <div
                              className="text-sm flex items-center truncate"
                              style={{ color: "#48A6A7" }}
                            >
                              <FaMapMarkerAlt
                                className="mr-1 flex-shrink-0"
                                size={12}
                              />
                              <span className="truncate">
                                {request.property.location}
                              </span>
                            </div>
                            <div className="text-sm font-semibold truncate">
                              ${request.property.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Buyer Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: "#006A71" }}
                        >
                          {request.buyer.name}
                        </div>
                        <div
                          className="text-sm truncate"
                          style={{ color: "#48A6A7" }}
                        >
                          {request.buyer.email}
                        </div>
                        <div className="text-sm truncate">
                          {request.buyer.phone}
                        </div>
                      </td>

                      {/* Date Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCalendarAlt
                            className="mr-2 flex-shrink-0"
                            style={{ color: "#9ACBD0" }}
                          />
                          <span className="text-sm">
                            {new Date(request.requestDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {request.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateRequestStatus(request.id, "Accepted")
                                }
                                className="flex items-center px-2 py-1 rounded-lg text-xs"
                                style={{
                                  backgroundColor: "#48A6A7",
                                  color: "#F2EFE7",
                                }}
                              >
                                <FaCheck className="mr-1" /> Accept
                              </button>
                              <button
                                onClick={() =>
                                  updateRequestStatus(request.id, "Rejected")
                                }
                                className="flex items-center px-2 py-1 rounded-lg text-xs"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  color: "#006A71",
                                  border: "1px solid #006A71",
                                }}
                              >
                                <FaTimes className="mr-1" /> Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() =>
                              handleEmailResponse(request.buyer.email)
                            }
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{
                              backgroundColor: "#9ACBD0",
                              color: "#006A71",
                            }}
                          >
                            <FaEnvelope className="mr-1" /> Email
                          </button>
                          <button
                            onClick={() =>
                              console.log(`View property ${request.id}`)
                            }
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#48A6A7",
                              border: "1px solid #48A6A7",
                            }}
                          >
                            <FaEye className="mr-1" /> View
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img
                        className="h-20 w-20 rounded-lg object-cover"
                        src={request.property.image}
                        alt={request.property.title}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3
                        className="text-lg font-medium"
                        style={{ color: "#006A71" }}
                      >
                        {request.property.title}
                      </h3>
                      <div
                        className="flex items-center mt-1"
                        style={{ color: "#48A6A7" }}
                      >
                        <FaMapMarkerAlt className="mr-1" size={12} />
                        <span className="text-sm">
                          {request.property.location}
                        </span>
                      </div>
                      <div className="text-sm font-semibold mt-1">
                        ${request.property.price.toLocaleString()}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <FaUser className="mr-2" style={{ color: "#9ACBD0" }} />
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#006A71" }}
                        >
                          {request.buyer.name}
                        </p>
                        <p className="text-xs" style={{ color: "#48A6A7" }}>
                          {request.buyer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCalendarAlt
                        className="mr-2"
                        style={{ color: "#9ACBD0" }}
                      />
                      <span className="text-sm">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between">
                      {request.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateRequestStatus(request.id, "Accepted")
                            }
                            className="flex items-center px-3 py-1 rounded-lg text-sm"
                            style={{
                              backgroundColor: "#48A6A7",
                              color: "#F2EFE7",
                            }}
                          >
                            <FaCheck className="mr-1" /> Accept
                          </button>
                          <button
                            onClick={() =>
                              updateRequestStatus(request.id, "Rejected")
                            }
                            className="flex items-center px-3 py-1 rounded-lg text-sm"
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#006A71",
                              border: "1px solid #006A71",
                            }}
                          >
                            <FaTimes className="mr-1" /> Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEmailResponse(request.buyer.email)}
                        className="flex items-center px-3 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: "#9ACBD0",
                          color: "#006A71",
                        }}
                      >
                        <FaEnvelope className="mr-1" /> Email
                      </button>
                      <button
                        onClick={() =>
                          console.log(`View property ${request.id}`)
                        }
                        className="flex items-center px-3 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#48A6A7",
                          border: "1px solid #48A6A7",
                        }}
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg mb-2" style={{ color: "#006A71" }}>
                No property requests found
              </p>
              <p className="text-gray-600 text-sm">
                {searchTerm || statusFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "You have no property requests at the moment"}
              </p>
              {(searchTerm || statusFilter !== "All") && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: "#48A6A7",
                    color: "#F2EFE7",
                  }}
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("All");
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredRequests.length > requestsPerPage && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full disabled:opacity-50"
                style={{
                  backgroundColor: currentPage === 1 ? "#9ACBD0" : "#48A6A7",
                  color: "#F2EFE7",
                }}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full ${
                      currentPage === page
                        ? "bg-[#006A71] text-white"
                        : "bg-[#9ACBD0] text-[#006A71]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-full disabled:opacity-50"
                style={{
                  backgroundColor:
                    currentPage === totalPages ? "#9ACBD0" : "#48A6A7",
                  color: "#F2EFE7",
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

export default RequestedPropertys;
