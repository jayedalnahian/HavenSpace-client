import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaFilter,
  FaFileExport,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useSoldPropertys from "../CustomHooks/useSoldPropertys";
import { Link } from "react-router";

const SoldProperties = () => {
  const {
    properties: soldProperties,
    isLoading,
    error,
    refetch,
  } = useSoldPropertys();
  refetch();
  console.log(soldProperties);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");
  const [showChart, setShowChart] = useState(false);

  // Format the properties data to match the expected structure
  const formatProperties = (properties) => {
    return properties.map((property) => ({
      id: property._id,
      title: property.title,
      location: property.location,
      soldPrice: property.maxPrice || property.minPrice || 0,
      originalPrice: property.maxPrice || property.minPrice || 0,
      buyer: {
        name: property.agentName || "Unknown Buyer",
        email: property.agentEmail || "unknown@example.com",
      },
      dateSold: property.createdAt,
      daysOnMarket: Math.floor(Math.random() * 90) + 1, // Random days for demo
      image: property.image,
      description: property.description,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      areaSize: property.areaSize,
      propertyType: property.propertyType,
    }));
  };

  const formattedProperties = soldProperties
    ? formatProperties(soldProperties)
    : [];

  // Filter properties based on search and time filter
  const filteredProperties = formattedProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const now = new Date();
    const soldDate = new Date(property.dateSold);
    const timeDiff = now - soldDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    let matchesTime = true;
    if (timeFilter === "30 Days") matchesTime = daysDiff <= 30;
    if (timeFilter === "This Year")
      matchesTime = soldDate.getFullYear() === now.getFullYear();

    return matchesSearch && matchesTime;
  });

  // Prepare data for sales chart (group by month)
  const prepareChartData = () => {
    const monthlyData = {};

    formattedProperties.forEach((property) => {
      const soldDate = new Date(property.dateSold);
      const month = soldDate.toLocaleString("default", { month: "short" });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          name: month,
          sales: 0,
          revenue: 0,
        };
      }

      monthlyData[month].sales += 1;
      monthlyData[month].revenue += property.soldPrice;
    });

    return Object.values(monthlyData);
  };

  const salesData = prepareChartData();

  const handleExport = () => {
    // In a real app, this would generate a CSV/PDF
    alert("Export functionality would generate a report here");
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="text-center">
          <p className="text-xl" style={{ color: "#006A71" }}>
            Loading sold properties...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <div className="text-center">
          <p className="text-xl text-red-500">
            Error loading sold properties: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F2EFE7" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1
            className="text-3xl font-bold mb-4 md:mb-0"
            style={{ color: "#006A71" }}
          >
            Sold Properties
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "#9ACBD0",
                color: "#006A71",
              }}
            >
              <FaChartLine />
              {showChart ? "Hide Chart" : "Show Sales Trend"}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "#48A6A7",
                color: "#F2EFE7",
              }}
            >
              <FaFileExport />
              Export Report
            </button>
          </div>
        </div>

        {/* Sales Chart (Conditional) */}
        {showChart && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md p-6 mb-8"
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#006A71" }}
            >
              Sales Performance
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9ACBD0" />
                  <XAxis dataKey="name" stroke="#006A71" />
                  <YAxis stroke="#006A71" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F2EFE7",
                      borderColor: "#48A6A7",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value, name) => {
                      if (name === "revenue")
                        return [`$${value.toLocaleString()}`, "Total Revenue"];
                      return [value, name];
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    name="Properties Sold"
                    fill="#48A6A7"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Total Revenue ($)"
                    fill="#006A71"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by property or location..."
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
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="All">All Time</option>
              <option value="30 Days">Last 30 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#9ACBD0]"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80";
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
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      SOLD
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-[#9ACBD0]" />
                    <span className="ml-2" style={{ color: "#006A71" }}>
                      {property.location}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <FaUser className="text-[#9ACBD0]" />
                    <span className="ml-2" style={{ color: "#006A71" }}>
                      {property.buyer.name} ({property.buyer.email})
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Sold Price</p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "#006A71" }}
                      >
                        ${property.soldPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">List Price</p>
                      <p
                        className="text-sm line-through"
                        style={{ color: "#006A71" }}
                      >
                        ${property.originalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-3">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-[#9ACBD0]" />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#006A71" }}
                      >
                        {new Date(property.dateSold).toLocaleDateString()}
                      </span>
                    </div>
                    <Link  to={`/propertyDetails/${property.id}`}>
                      <button
                        className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: "#48A6A7",
                          color: "#F2EFE7",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#006A71")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#48A6A7")
                        }
                        onClick={() =>
                          console.log(`View details for ${property.id}`)
                        }
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-xl mb-4" style={{ color: "#006A71" }}>
              No sold properties found
            </p>
            <p className="text-gray-600 mb-4">
              {searchTerm || timeFilter !== "All"
                ? "Try adjusting your search or filters"
                : "You haven't sold any properties yet"}
            </p>
            {(searchTerm || timeFilter !== "All") && (
              <button
                className="px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: "#48A6A7",
                  color: "#F2EFE7",
                }}
                onClick={() => {
                  setSearchTerm("");
                  setTimeFilter("All");
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoldProperties;
