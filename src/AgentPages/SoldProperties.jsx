import React, { useState } from 'react';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUser,
  FaFilter,
  FaFileExport,
  FaChartLine
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SoldProperties = () => {
  // Mock sold properties data
  const mockSoldProperties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Malibu, CA",
      soldPrice: 2450000,
      originalPrice: 2500000,
      buyer: { name: "Alex Johnson", email: "alex.j@example.com" },
      dateSold: "2023-06-15",
      daysOnMarket: 45,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      title: "Downtown Loft Apartment",
      location: "New York, NY",
      soldPrice: 830000,
      originalPrice: 850000,
      buyer: { name: "Sarah Williams", email: "sarah.w@example.com" },
      dateSold: "2023-05-22",
      daysOnMarket: 28,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      location: "Austin, TX",
      soldPrice: 635000,
      originalPrice: 650000,
      buyer: { name: "Michael Brown", email: "michael.b@example.com" },
      dateSold: "2023-04-10",
      daysOnMarket: 62,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      title: "Mountain View Cabin",
      location: "Aspen, CO",
      soldPrice: 1200000,
      originalPrice: 1250000,
      buyer: { name: "Emily Davis", email: "emily.d@example.com" },
      dateSold: "2023-03-05",
      daysOnMarket: 91,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  // State management
  const [properties, setProperties] = useState(mockSoldProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('All');
  const [showChart, setShowChart] = useState(false);

  // Filter properties based on search and time filter
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const soldDate = new Date(property.dateSold);
    const timeDiff = now - soldDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    let matchesTime = true;
    if (timeFilter === '30 Days') matchesTime = daysDiff <= 30;
    if (timeFilter === 'This Year') matchesTime = soldDate.getFullYear() === now.getFullYear();
    
    return matchesSearch && matchesTime;
  });

  // Prepare data for sales chart
  const salesData = [
    { name: 'Jan', sales: 2, revenue: 1850000 },
    { name: 'Feb', sales: 1, revenue: 1200000 },
    { name: 'Mar', sales: 3, revenue: 2480000 },
    { name: 'Apr', sales: 2, revenue: 1465000 },
    { name: 'May', sales: 4, revenue: 3280000 },
    { name: 'Jun', sales: 3, revenue: 2870000 },
  ];

  const handleExport = () => {
    // In a real app, this would generate a CSV/PDF
    alert("Export functionality would generate a report here");
  };

  return (
    <div 
      className="min-h-screen p-6" 
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 
            className="text-3xl font-bold mb-4 md:mb-0" 
            style={{ color: '#006A71' }}
          >
            Sold Properties
          </h1>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: '#9ACBD0',
                color: '#006A71'
              }}
            >
              <FaChartLine />
              {showChart ? 'Hide Chart' : 'Show Sales Trend'}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: '#48A6A7',
                color: '#F2EFE7'
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
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md p-6 mb-8"
          >
            <h2 
              className="text-xl font-semibold mb-4" 
              style={{ color: '#006A71' }}
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
                      backgroundColor: '#F2EFE7',
                      borderColor: '#48A6A7',
                      borderRadius: '0.5rem'
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
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 
                      className="text-xl font-bold truncate" 
                      style={{ color: '#006A71' }}
                    >
                      {property.title}
                    </h3>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      SOLD
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-[#9ACBD0]" />
                    <span className="ml-2" style={{ color: '#006A71' }}>{property.location}</span>
                  </div>

                  <div className="flex items-center mb-2">
                    <FaUser className="text-[#9ACBD0]" />
                    <span className="ml-2" style={{ color: '#006A71' }}>
                      {property.buyer.name} ({property.buyer.email})
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Sold Price</p>
                      <p className="text-lg font-bold" style={{ color: '#006A71' }}>
                        ${property.soldPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">List Price</p>
                      <p className="text-sm line-through" style={{ color: '#006A71' }}>
                        ${property.originalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-3">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-[#9ACBD0]" />
                      <span className="ml-2 text-sm" style={{ color: '#006A71' }}>
                        {new Date(property.dateSold).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      style={{ 
                        backgroundColor: '#48A6A7',
                        color: '#F2EFE7'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#006A71'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#48A6A7'}
                      onClick={() => console.log(`View details for ${property.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-xl mb-4" style={{ color: '#006A71' }}>
              No sold properties found
            </p>
            <p className="text-gray-600 mb-4">
              {searchTerm || timeFilter !== 'All' 
                ? "Try adjusting your search or filters" 
                : "You haven't sold any properties yet"}
            </p>
            {(searchTerm || timeFilter !== 'All') && (
              <button
                className="px-4 py-2 rounded-lg font-medium"
                style={{ 
                  backgroundColor: '#48A6A7',
                  color: '#F2EFE7'
                }}
                onClick={() => {
                  setSearchTerm('');
                  setTimeFilter('All');
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