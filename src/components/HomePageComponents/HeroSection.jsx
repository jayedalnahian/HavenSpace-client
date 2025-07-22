// HeroSection.jsx
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button'; // if using shadcn/ui

const HeroSection = () => {
  return (
    <div className="bg-[#F2EFE7] w-full min-h-[80vh] flex items-center justify-center px-4 md:px-16">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#006A71] leading-tight">
            Find Your <span className="text-[#48A6A7]">Dream Property</span>
          </h1>
          <p className="text-[#006A71] text-lg md:text-xl">
            Explore verified properties, connect with trusted agents, and own your next home.
          </p>
          <div className="flex gap-4">
            <Link to="/all-properties">
              <button className="bg-[#006A71] hover:bg-[#048b94] text-white px-6 py-3 rounded-xl shadow-xl">
                Browse Properties
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Image or Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994" 
            alt="Real estate illustration"
            className="rounded-2xl shadow-2xl w-full object-cover max-h-[400px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
