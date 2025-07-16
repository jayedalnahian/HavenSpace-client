import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { StarIcon, HomeIcon } from '@heroicons/react/24/outline';
import useUserReviews from '../CustomHooks/useUserReviews';

const UserMyReviews = () => {
  const { properties, isLoading, error, refetch } = useUserReviews();
  refetch()

  const formatDate = (dateString) => {
    console.log(dateString);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    console.log(new Date(dateString).toLocaleDateString(undefined, options));
    
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-100 p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error loading reviews</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button 
            onClick={refetch}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <div className="bg-secondary bg-opacity-20 p-8 rounded-lg text-center max-w-md">
          <HomeIcon className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-semibold text-text mb-2">You haven't reviewed any properties yet</h2>
          <p className="text-gray-600 mb-6">Share your experiences to help others find their perfect home.</p>
          <Link 
            to="/all-properties"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Browse Properties
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">My Reviews</h1>
      
      <div className="space-y-6">
        {properties.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-full md:w-1/4">
                  <img 
                    src={review.propertyIMG || '/default-property.jpg'} 
                    alt={review.title} 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-text">{review.title}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{review.rating}.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-700">{review.text}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{review.postedAt}</span>
                      {/* You can add status indicators here if needed */}
                      
                    </div>
                    
                    <Link 
                      to={`/propertyDetails/${review.propertyId}`}
                      className=" bg-secondary hover:bg-secondary-dark text-white py-2 w-fit px-4 rounded-lg transition-colors"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserMyReviews;