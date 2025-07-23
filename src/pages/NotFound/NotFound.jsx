import React, { useEffect } from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    useEffect(() => {
        document.title = "HavenSpace | Not Found";
      }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-[#48A6A7] hover:bg-[#006A71] text-white px-6 py-3 rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
