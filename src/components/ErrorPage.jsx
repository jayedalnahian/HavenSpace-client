import React from 'react';
import { useRouteError, Link } from 'react-router';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div 
        className="max-w-md w-full p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle 
            size={64} 
            className="text-[#48A6A7]" 
          />
        </div>
        
        {/* Error Message */}
        <h1 
          className="text-3xl font-bold mb-4"
          style={{ color: '#006A71' }}
        >
          Oops! Something Went Wrong
        </h1>
        
        <p 
          className="text-lg mb-6"
          style={{ color: '#006A71' }}
        >
          We're sorry, but an unexpected error occurred. Please try again later.
        </p>
        
        
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn flex items-center justify-center gap-2"
            style={{ 
              backgroundColor: '#48A6A7',
              color: '#F2EFE7'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#006A71'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#48A6A7'}
          >
            <FaHome /> Go Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="btn flex items-center justify-center gap-2"
            style={{ 
              backgroundColor: '#9ACBD0',
              color: '#006A71'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#48A6A7'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9ACBD0'}
          >
            <FaRedo /> Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;