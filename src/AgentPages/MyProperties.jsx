import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaEdit,
  FaTrash,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";

import { motion } from "framer-motion";
import useProperties from "../CustomHooks/useProperties";
import { Link } from "react-router";
import useDeleteProperty from "../CustomHooks/useDeleteProperty";
import Swal from "sweetalert2";

const MyProperties = () => {
  const { properties: myAddedProperties, isLoading, error, refetch} = useProperties();
  refetch()
  const { mutate: deleteProperty, isPending } = useDeleteProperty();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Format the properties data to match the expected structure
  const formatProperties = (properties) => {
    return properties.map((property) => ({
      id: property._id,
      title: property.title,
      type: property.propertyType,
      location: property.location,
      price: property.maxPrice || property.minPrice || 0,
      status: property.availability,
      dateAdded: property.createdAt,
      image: property.image,
      description: property.description,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      areaSize: property.areaSize,
      features: property.features,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
    }));
  };

  const formattedProperties = myAddedProperties
    ? formatProperties(myAddedProperties)
    : [];

  // Filter properties based on search and filters
  const filteredProperties = formattedProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || property.status === statusFilter;
    const matchesType = typeFilter === "All" || property.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  // console.log(currentProperties);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Get unique property types for filter dropdown
  const propertyTypes = [
    "All",
    ...new Set(formattedProperties.map((property) => property.type)),
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#48A6A7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
      }
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Sold":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "House":
      case "Villa":
        return <FaHome className="text-[#48A6A7]" />;
      case "Apartment":
      case "Townhouse":
        return <FaBuilding className="text-[#48A6A7]" />;
      case "Land":
        return <FaLandmark className="text-[#48A6A7]" />;
      case "Commercial":
        return <FaBuilding className="text-[#48A6A7]" />;
      default:
        return <FaHome className="text-[#48A6A7]" />;
    }
  };

  if (isLoading || isPending) {
    return (
      <div
        className="p-6 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="text-center">
          <p className="text-xl" style={{ color: "#006A71" }}>
            Loading properties...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-6 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="text-center">
          <p className="text-xl text-red-500">
            Error loading properties: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#F2EFE7" }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#006A71" }}>
          My Properties
        </h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title or location..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
              style={{ backgroundColor: "#FFFFFF" }}
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
                style={{ backgroundColor: "#FFFFFF" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7] appearance-none"
                style={{ backgroundColor: "#FFFFFF" }}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {currentProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80";
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-xl font-bold truncate"
                      style={{ color: "#006A71" }}
                    >
                      {property.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        property.status
                      )}`}
                    >
                      {property.status}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    {getTypeIcon(property.type)}
                    <span className="ml-2 text-gray-600">{property.type}</span>
                  </div>

                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-[#9ACBD0]" />
                    <span className="ml-2" style={{ color: "#006A71" }}>
                      {property.location}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "#006A71" }}
                      >
                        ${property.price.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Added</p>
                      <p className="text-sm" style={{ color: "#006A71" }}>
                        {new Date(property.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Link to={`/propertyDetails/${property.id}`}>
                      <button
                        className="p-2 rounded-full hover:bg-[#9ACBD0] hover:text-white transition-colors"
                        style={{ color: "#48A6A7" }}
                        onClick={() => console.log(`Edit property ${property}`)}
                      >
                        <FcViewDetails size={20} />
                      </button>
                    </Link>
                    <Link to={`/EditPropertyDetails/${property.id}`}>
                      <button
                        className="p-2 rounded-full hover:bg-[#9ACBD0] hover:text-white transition-colors"
                        style={{ color: "#48A6A7" }}
                        onClick={() =>
                          console.log(`Edit property ${property.id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                      className="p-2 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
                      style={{ color: "#48A6A7" }}
                      onClick={() => handleDelete(property.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-xl" style={{ color: "#006A71" }}>
              No properties found matching your criteria
            </p>
            <button
              className="mt-4 px-4 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: "#48A6A7",
                color: "#F2EFE7",
              }}
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
                setTypeFilter("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProperties.length > propertiesPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
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
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
