import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Link } from 'react-router';
import { StarIcon, HomeIcon } from '@heroicons/react/24/outline';
import useAuth from '../CustomHooks/useAuth';

const UserMyReviews = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading user reviews (replace with actual data fetching later)
    const simulateLoadingReviews = () => {
      setTimeout(() => {
        // Mock data - replace with actual API call later
        const mockReviews = [
          {
            id: '1',
            propertyId: '101',
            propertyTitle: 'Luxury Beachfront Villa',
            propertyImage: '/villa.jpg',
            rating: 5,
            comment: 'Absolutely stunning property with breathtaking ocean views. The amenities were top-notch!',
            date: '2023-10-15T12:00:00Z',
            status: 'live'
          },
          {
            id: '2',
            propertyId: '202',
            propertyTitle: 'Downtown Modern Loft',
            propertyImage: '/loft.jpg',
            rating: 4,
            comment: 'Great location and stylish interior. The neighborhood was vibrant and full of life.',
            date: '2023-09-22T12:00:00Z',
            status: 'edited'
          }
        ];
        setReviews(mockReviews);
        setLoading(false);
      }, 1000);
    };

    if (currentUser) {
      simulateLoadingReviews();
    }
  }, [currentUser]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
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
        {reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-full md:w-1/4">
                  <img 
                    src={review.propertyImage || '/default-property.jpg'} 
                    alt={review.propertyTitle} 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-text">{review.propertyTitle}</h3>
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
                  
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                      {review.status === 'edited' && (
                        <span className="px-2 py-1 bg-secondary bg-opacity-20 text-xs text-text rounded-full">
                          Edited
                        </span>
                      )}
                      {review.status === 'pending' && (
                        <span className="px-2 py-1 bg-yellow-100 text-xs text-yellow-800 rounded-full">
                          Pending Edit
                        </span>
                      )}
                      {review.status === 'live' && (
                        <span className="px-2 py-1 bg-green-100 text-xs text-green-800 rounded-full">
                          Live
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/properties/${review.propertyId}`}
                      className="text-sm text-primary hover:underline"
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