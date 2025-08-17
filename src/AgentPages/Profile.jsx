import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaCalendarAlt,
  FaUserShield,
  FaUserTie,
  FaUserCircle,
  FaEdit,
  FaKey,
  FaSpinner,
} from "react-icons/fa";
import useUserData from "../CustomHooks/useUserData";

const Profile = () => {
  const { userData, isLoading, error, refetch } = useUserData();
 
  

  const getRoleIcon = () => {
    switch (userData?.role) {
      case "admin":
        return <FaUserShield className="text-[#48A6A7]" />;
      case "agent":
        return <FaUserTie className="text-[#48A6A7]" />;
      default:
        return <FaUserCircle className="text-[#48A6A7]" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
        <FaSpinner className="animate-spin text-4xl text-[#48A6A7]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-[#006A71] mb-4">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-[#48A6A7] hover:bg-[#006A71] text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-[#006A71] mb-4">
            No Profile Data Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any profile information for your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#F2EFE7]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#006A71]">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 text-center bg-[#9ACBD0]">
            <div className="flex justify-center mb-4">
              {userData.photo ? (
                <img
                  src={userData.photo  || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}&backgroundColor=006A71&fontColor=F2EFE7`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-white shadow-md bg-[#48A6A7]">
                  <FaUser className="text-white text-5xl" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#006A71]">
              {userData.name}
            </h2>
            <div className="flex items-center justify-center mt-2">
              {getRoleIcon()}
              <span className="ml-2 capitalize font-medium text-[#006A71]">
                {userData.role}
              </span>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                <ProfileField
                  icon={<FaEnvelope />}
                  label="Email"
                  value={userData.email}
                />
                <ProfileField
                  icon={<FaPhone />}
                  label="Phone"
                  value={userData.phone || "Not provided"}
                />
                <ProfileField
                  icon={<FaGlobe />}
                  label="Country"
                  value={userData.country || "Not provided"}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <ProfileField
                  icon={<FaCalendarAlt />}
                  label="Date of Birth"
                  value={formatDate(userData.birth)}
                />
                <ProfileField
                  icon={<FaCalendarAlt />}
                  label="Member Since"
                  value={formatDate(userData.createdAt)}
                />
                <ProfileField
                  icon={<FaUser />}
                  label="User ID"
                  value={userData.uid}
                />
              </div>
            </div>

            
            {/* <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors bg-[#48A6A7] text-[#F2EFE7] hover:bg-[#006A71]"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors bg-[#9ACBD0] text-[#006A71] hover:bg-[#48A6A7]"
              >
                <FaKey className="mr-2" />
                Change Password
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Profile Field Component
const ProfileField = ({ icon, label, value }) => {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1 text-[#48A6A7]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-[#006A71]">
          {label}
        </p>
        <p className="text-lg font-semibold text-[#006A71] break-all">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;