import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaBuilding,
  FaCheckCircle,
  FaHandshake,
  FaBars,
  FaUserCircle,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaUserShield,
  FaFlag,
  FaBullhorn,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import useUserRole from "../../CustomHooks/useUserRole";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPage from "../../components/ErrorPage";

const DashboardLayout = () => {
  const agentNavLinks = [
    { to: "agent/profile", icon: <FaUser />, text: "My Profile" },
    { to: "agent/add-property", icon: <FaPlus />, text: "Add Property" },
    { to: "agent/my-properties", icon: <FaBuilding />, text: "My Properties" },
    {
      to: "agent/sold-properties",
      icon: <FaCheckCircle />,
      text: "Sold Properties",
    },
    {
      to: "agent/requests",
      icon: <FaHandshake />,
      text: "Requested Properties",
    },
  ];

  const adminNavLinks = [
    { to: "admin/profile", icon: <FaUserShield />, text: "My Profile" },
    {
      to: "admin/reported-properties",
      icon: <FaFlag />,
      text: "Reported Properties",
    },
    {
      to: "admin/advertise-properties",
      icon: <FaBullhorn />,
      text: "Advertise Properties",
    },
    {
      to: "admin/manage-reviews",
      icon: <FaCheckCircle />,
      text: "Manage Reviews",
    },
    {
      to: "admin/manage-properties",
      icon: <FaClipboardList />,
      text: "Manage Properties",
    },
    { to: "admin/manage-users", icon: <FaUsers />, text: "Manage Users" },
  ];

  const userNavLinks = [
    { to: "user/profile", icon: <FaUserCircle />, text: "My Profile" },
    { to: "user/wishlist", icon: <FaHeart />, text: "My Wish List" },
    {
      to: "user/bought",
      icon: <FaShoppingBag />,
      text: "My Bought Properties",
    },
    { to: "user/reviews", icon: <FaStar />, text: "My Reviews" },
  ];

  const [user, setUser] = useState(userNavLinks);

  const { role, isLoading, error, loading} = useUserRole();
  
  useEffect(() => {
    if (role === "admin") {
      setUser(adminNavLinks);
    } else if (role === "agent") {
      setUser(agentNavLinks);
    } else {
      setUser(userNavLinks);
    }
  }, [role]);

  if (isLoading || loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F2EFE7" }}>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        {/* Page content */}
        <div className="drawer-content">
          {/* Mobile navbar */}
          <div
            className="lg:hidden navbar"
            style={{ backgroundColor: "#48A6A7" }}
          >
            <div className="flex-none">
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost text-white"
              >
                <FaBars size={20} />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-white font-bold text-xl">
              RealEstatePro
            </div>
          </div>

          {/* Main content area */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay lg:hidden"
          ></label>

          <div
            className="menu w-80 min-h-full p-4"
            style={{
              backgroundColor: "#48A6A7",
              color: "#F2EFE7",
            }}
          >
            {/* Sidebar header */}
            <div className="mb-8 p-4 flex items-center gap-3">
              <FaHome size={24} />
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>

            {/* Navigation links */}
            <ul className="space-y-2">
              {user.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-[#006A71] text-white"
                          : "hover:bg-[#9ACBD0] hover:text-[#006A71]"
                      }`
                    }
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
