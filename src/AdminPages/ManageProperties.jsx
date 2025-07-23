import React, { useState, useMemo } from "react";
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
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import useAllProperties from "../CustomHooks/useAllProperties";
import useToggleAdminApproval from "../CustomHooks/useToggleAdminApproval";

const ManageProperties = () => {
  const { mutate: toggleAdminApproval, isPending } = useToggleAdminApproval();
  const {
    properties: allProperties = [],
    isLoading,
    error,
    refetch,
  } = useAllProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  // Format properties data
  const formattedProperties = useMemo(() => {
    return allProperties.map((property) => ({
      id: property._id,
      title: property.title,
      image:
        property.image ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      location: property.location,
      price: property.maxPrice || property.minPrice || 0,
      agent: {
        name: property.creatorName || "Unknown Agent",
        email: property.creatorEmail || "unknown@example.com",
      },
      status:
        property.adminApproval === "true"
          ? "Approved"
          : property.adminApproval === "pending"
          ? "Pending"
          : property.adminApproval === "false"
          ? "Rejected"
          : "Unknown",
      dateListed: property.createdAt,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
    }));
  }, [allProperties]);

  // Filter properties based on search and status filter
  const filteredProperties = useMemo(() => {
    return formattedProperties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.agent.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || property.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [formattedProperties, searchTerm, statusFilter]);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties?.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Count properties by status
  const propertyCounts = useMemo(() => {
    return {
      all: formattedProperties.length,
      approved: formattedProperties.filter((p) => p.status === "Approved")
        .length,
      pending: formattedProperties.filter((p) => p.status === "Pending").length,
      rejected: formattedProperties.filter((p) => p.status === "Rejected")
        .length,
    };
  }, [formattedProperties]);

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handle property actions
  const approveProperty = async (propertyId) => {
    const newStatus = "true";
    await toggleAdminApproval({ propertyId, newStatus });
    refetch();
  };

  const rejectProperty = async (propertyId) => {
    const newStatus = "false";
    await toggleAdminApproval({ propertyId, newStatus });
    refetch();
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <div className="text-center text-xl p-6">Loading properties...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500 p-6">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#F2EFE7]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#006A71]">
          Manage Properties
        </h1>

        {/* Property Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Total Properties</p>
            <p className="text-2xl font-bold text-[#006A71]">
              {propertyCounts.all}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {propertyCounts.approved}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {propertyCounts.pending}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {propertyCounts.rejected}
            </p>
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
              placeholder="Search properties, locations or agents..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7] bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7] appearance-none bg-white"
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
                  <tr className="bg-[#9ACBD0]">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Agent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Listed
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#006A71] whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProperties.map((property) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={
                        property.status === "Pending" ? "bg-yellow-50" : ""
                      }
                    >
                      {/* Property Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={property.image}
                              alt={property.title}
                            />
                          </div>
                          <div className="ml-4 min-w-0">
                            <div className="text-sm font-medium truncate text-[#006A71]">
                              {property.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {property.propertyType}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-[#9ACBD0]" />
                          <span className="text-sm truncate">
                            {property.location}
                          </span>
                        </div>
                      </td>

                      {/* Price Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaDollarSign className="mr-1 text-[#9ACBD0]" />
                          <span className="text-sm font-semibold">
                            ${property.price.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Agent Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <FaUser className="mr-2 text-[#9ACBD0]" />
                          <div>
                            <div className="text-sm truncate">
                              {property.agent.name}
                            </div>
                            <div className="text-xs truncate text-[#48A6A7]">
                              {property.agent.email}
                            </div>
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
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {property.status !== "Approved" && (
                            <button
                              onClick={() => approveProperty(property.id)}
                              className="flex items-center px-2 py-1 rounded-lg text-xs bg-[#48A6A7] text-[#F2EFE7]"
                            >
                              <FaCheck className="mr-1" /> Approve
                            </button>
                          )}
                          {property.status !== "Rejected" && (
                            <button
                              onClick={() => rejectProperty(property.id)}
                              className="flex items-center px-2 py-1 rounded-lg text-xs bg-white text-red-500 border border-red-500"
                            >
                              <FaTimes className="mr-1" /> Reject
                            </button>
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
              <p className="text-xl mb-2 text-[#006A71]">No properties found</p>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "No properties have been listed yet"}
              </p>
              {(searchTerm || statusFilter !== "All") && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg font-medium bg-[#48A6A7] text-[#F2EFE7]"
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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl shadow-md overflow-hidden ${
                  property.status === "Pending"
                    ? "border-l-4 border-yellow-400"
                    : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img
                        className="h-20 w-20 rounded-lg object-cover"
                        src={property.image}
                        alt={property.title}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium text-[#006A71]">
                        {property.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {property.propertyType}
                      </p>
                      <div className="flex items-center mt-1">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-[#9ACBD0]" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center">
                      <FaDollarSign className="mr-2 text-[#9ACBD0]" />
                      <span className="text-sm font-semibold">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaUser className="mr-2 text-[#9ACBD0]" />
                      <div>
                        <span className="text-sm">{property.agent.name}</span>
                        <div className="text-xs text-[#48A6A7]">
                          {property.agent.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-[#9ACBD0]" />
                      <span className="text-sm">
                        {formatDateTime(property.dateListed)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {property.status !== "Approved" && (
                        <button
                          onClick={() => approveProperty(property.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs bg-[#48A6A7] text-[#F2EFE7]"
                        >
                          <FaCheck className="mr-1" /> Approve
                        </button>
                      )}
                      {property.status !== "Rejected" && (
                        <button
                          onClick={() => rejectProperty(property.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-xs bg-white text-red-500 border border-red-500"
                        >
                          <FaTimes className="mr-1" /> Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg mb-2 text-[#006A71]">No properties found</p>
              <p className="text-gray-600 text-sm">
                {searchTerm || statusFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "No properties have been listed yet"}
              </p>
              {(searchTerm || statusFilter !== "All") && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-[#48A6A7] text-[#F2EFE7]"
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
        {filteredProperties.length > propertiesPerPage && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1 ? "bg-[#9ACBD0]" : "bg-[#48A6A7]"
                } text-[#F2EFE7]`}
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
                className={`p-2 rounded-full ${
                  currentPage === totalPages ? "bg-[#9ACBD0]" : "bg-[#48A6A7]"
                } text-[#F2EFE7]`}
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
