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
  // Default data structure if no props are passed
  const { userData, isLoading, error, refetch } = useUserData();
  console.log(userData);

  const defaultUserData = {
    profilePicture: null,
    fullName: "John Doe",
    email: "john.doe@havenspace.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    dateOfBirth: "1985-05-15",
    role: "user", // 'admin', 'agent', or 'user'
    createdAt: "2023-01-10T08:30:00Z",
    lastLogin: "2023-06-15T14:45:00Z",
  };

  const data = userData || defaultUserData;
  console.log("data", data);

  const getRoleIcon = () => {
    switch (data.role) {
      case "admin":
        return <FaUserShield className="text-[#48A6A7]" />;
      case "agent":
        return <FaUserTie className="text-[#48A6A7]" />;
      default:
        return <FaUserCircle className="text-[#48A6A7]" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#F2EFE7" }}
      >
        <FaSpinner
          className="animate-spin text-4xl"
          style={{ color: "#48A6A7" }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "#F2EFE7" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#006A71" }}
        >
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div
            className="p-6 text-center"
            style={{ backgroundColor: "#9ACBD0" }}
          >
            <div className="flex justify-center mb-4">
              {data.photo ? (
                <img
                  src={data.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                  style={{ backgroundColor: "#48A6A7" }}
                >
                  <FaUser className="text-white text-5xl" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "#006A71" }}>
              {data.name}
            </h2>
            <div className="flex items-center justify-center mt-2">
              {getRoleIcon()}
              <span
                className="ml-2 capitalize font-medium"
                style={{ color: "#006A71" }}
              >
                {data.role}
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
                  value={data.email}
                />
                <ProfileField
                  icon={<FaPhone />}
                  label="Phone"
                  value={data.phone}
                />
                <ProfileField
                  icon={<FaGlobe />}
                  label="Country"
                  value={data.country}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <ProfileField
                  icon={<FaCalendarAlt />}
                  label="Date of Birth"
                  value={formatDate(data.birth)}
                />
                <ProfileField
                  icon={<FaCalendarAlt />}
                  label="Member Since"
                  value={formatDate(data.createdAt)}
                />
                
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: "#48A6A7",
                  color: "#F2EFE7",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#006A71")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#48A6A7")
                }
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: "#9ACBD0",
                  color: "#006A71",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#48A6A7")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#9ACBD0")
                }
              >
                <FaKey className="mr-2" />
                Change Password
              </button>
            </div>
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
      <div className="mr-4 mt-1" style={{ color: "#48A6A7" }}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: "#006A71" }}>
          {label}
        </p>
        <p className="text-lg font-semibold" style={{ color: "#006A71" }}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default Profile;
