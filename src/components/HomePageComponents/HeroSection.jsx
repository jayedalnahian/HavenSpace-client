import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-[#F2EFE7] via-[#9ACBD0] to-[#48A6A7] overflow-hidden">
      {/* Floating abstract shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#006A71]/30 rounded-full blur-3xl animate-bounce" />

      {/* Hero Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-20">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-[#006A71] leading-tight">
              Find Your Perfect Haven
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Discover trusted agents, explore verified listings, and secure your dream home with ease.
            </p>

            <div className="flex gap-4">
              <Link 
                to="/all-properties" 
                className="bg-[#48A6A7] text-white px-6 py-3 rounded-2xl text-lg shadow-lg hover:shadow-xl hover:bg-[#379091] transition"
              >
                Explore Properties
              </Link>
              <Link 
                to="/dashboard" 
                className="border-2 border-[#48A6A7] text-[#006A71] px-6 py-3 rounded-2xl text-lg hover:bg-[#48A6A7]/10 transition"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Right Side (Hero Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden md:flex w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
              alt="Luxury Property"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <ArrowDown className="w-6 h-6 text-[#006A71]" />
      </motion.div>
    </section>
  );
}