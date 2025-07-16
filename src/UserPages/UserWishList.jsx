// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import useWishlishtPropertys from "../CustomHooks/useWishlishtPropertys";
import Swal from "sweetalert2";
import useDeleteFromWishlist from "../CustomHooks/useDeleteFromWishlist";

const UserWishList = () => {
  const { properties, isLoading, error, refetch } = useWishlishtPropertys();
  refetch();
  // const [sortBy, setSortBy] = useState("dateAdded");
  const navigate = useNavigate();
  
  const { mutate: deleteProperty, isPending } = useDeleteFromWishlist();
  
  // Mock user ID - in a real app, this would come from auth context

  // Mock fetch function - replace with actual API call
  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       // Simulate API call
  //       await new Promise(resolve => setTimeout(resolve, 800));

  //       // const mockWishlist = [
  //       //   {
  //       //     id: '1',
  //       //     title: 'Luxury Beachfront Villa',
  //       //     location: 'Malibu, California',
  //       //     price: 4500000,
  //       //     type: 'Villa',
  //       //     agent: 'Sarah Johnson',
  //       //     status: 'Available',
  //       //     image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //       //     dateAdded: new Date('2023-05-15')
  //       //   },
  //       //   {
  //       //     id: '2',
  //       //     title: 'Modern Downtown Apartment',
  //       //     location: 'New York, NY',
  //       //     price: 1200000,
  //       //     type: 'Apartment',
  //       //     agent: 'Michael Chen',
  //       //     status: 'Available',
  //       //     image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //       //     dateAdded: new Date('2023-06-20')
  //       //   },
  //       //   {
  //       //     id: '3',
  //       //     title: 'Mountain View Cabin',
  //       //     location: 'Aspen, Colorado',
  //       //     price: 850000,
  //       //     type: 'Cabin',
  //       //     agent: 'David Wilson',
  //       //     status: 'Sold',
  //       //     image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //       //     dateAdded: new Date('2023-04-10')
  //       //   }
  //       // ];

  //       setWishlist(mockWishlist);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Failed to fetch wishlist:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlist();
  // }, [userId]);

  // const handleRemove = (propertyId) => {
  //   if (window.confirm('Are you sure you want to remove this property from your wishlist?')) {
  //     // setWishlist(prev => prev.filter(property => property.id !== propertyId));
  //   }
  // };

  // const handleViewDetails = (propertyId) => {
  //   navigate(`/properties/${propertyId}`);
  // };

  // const sortedWishlist = [...properties].sort((a, b) => {
  //   if (sortBy === 'price') {
  //     return a.price - b.price;
  //   } else {
  //     return new Date(b.dateAdded) - new Date(a.dateAdded);
  //   }
  // });

  const handleDelete = (id) => {
    console.log(id);

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

        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (properties?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-main mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start exploring properties and save your favorites to your wishlist.
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-main">My Wishlist</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"}
          </span>
          {/* <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="dateAdded">Recently Added</option>
            <option value="price">Price: Low to High</option>
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {properties.map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {property.status}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-main mb-1">
                    {property.title}
                  </h3>
                  <span className="text-primary font-bold">
                    ${property.maxPrice}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{property.location}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{property.type}</span>
                  <span>Agent: {property.agentEmail}</span>
                </div>

                <div className="flex space-x-3">
                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="flex-1 bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg transition-colors">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserWishList;
