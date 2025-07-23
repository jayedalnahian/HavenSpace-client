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
import ErrorPage from "../../components/ErrorPage"

const DashboardLayout = () => {

  useEffect(() => {
    document.title = "HavenSpace | Dashboard";
  }, []);
  // Define all navigation options
  const agentNavLinks = [
    { to: "/dashboard", icon: <FaUser />, text: "My Profile" },
    { to: "add-property", icon: <FaPlus />, text: "Add Property" },
    { to: "my-properties", icon: <FaBuilding />, text: "My Properties" },
    {
      to: "sold-properties",
      icon: <FaCheckCircle />,
      text: "Sold Properties",
    },
    {
      to: "requests",
      icon: <FaHandshake />,
      text: "Requested Properties",
    },
  ];

  const adminNavLinks = [
    {
      to: "/dashboard",
      icon: <FaUserShield />,
      text: "My Profile",
    },
    {
      to: "manage-properties",
      icon: <FaClipboardList />,
      text: "Manage Properties",
    },
    {
      to: "manage-users",
      icon: <FaUsers />,
      text: "Manage Users",
    },
    {
      to: "manage-reviews",
      icon: <FaCheckCircle />,
      text: "Manage Reviews",
    },
  ];

  const userNavLinks = [
    { to: "/dashboard", icon: <FaUserCircle />, text: "My Profile" },
    { to: "wishlist", icon: <FaHeart />, text: "My Wish List" },
    {
      to: "bought",
      icon: <FaShoppingBag />,
      text: "My Bought Properties",
    },
    { to: "reviews", icon: <FaStar />, text: "My Reviews" },
  ];

  const [navLinks, setNavLinks] = useState([]);
  const { role, isLoading, error } = useUserRole();

  useEffect(() => {
    if (role === "admin") {
      setNavLinks(adminNavLinks);
    } else if (role === "agent") {
      setNavLinks(agentNavLinks);
    } else {
      setNavLinks(userNavLinks);
    }
  }, [role]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage/>;
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
              {navLinks?.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.to}
                    end
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
