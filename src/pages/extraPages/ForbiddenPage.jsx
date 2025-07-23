import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaBan } from "react-icons/fa";
import { useEffect } from "react";

const ForbiddenPage = () => {
  useEffect(() => {
      document.title = "HavenSpace | Forbidden";
    }, []);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-primary text-5xl mb-4">
          <FaBan />
        </div>
        <h1 className="text-3xl font-bold text-textDark mb-2">Access Forbidden</h1>
        <p className="text-textLight mb-6">
          You don’t have permission to view this page. Please check your access level or contact support.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-5 py-2 rounded-xl hover:bg-secondary transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
