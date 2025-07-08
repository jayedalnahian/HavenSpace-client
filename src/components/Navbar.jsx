import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link, NavLink } from 'react-router';
import { CgProfile } from 'react-icons/cg';
import { IoIosNotifications } from 'react-icons/io';

const Navbar = ({ userData }) => {
  const { user, logOut } = useContext(AuthContext);

  const logOutUser = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Log Out Successful",
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#006A71] font-bold" : "hover:text-[#48A6A7]"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-properties" className={({ isActive }) => isActive ? "text-[#006A71] font-bold" : "hover:text-[#48A6A7]"}>
          All Properties
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-[#006A71] font-bold" : "hover:text-[#48A6A7]"}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  const loginSection = (
    <div className="flex items-center gap-3">
      {!user && (
        <NavLink to="/login" className="btn btn-sm bg-[#48A6A7] text-[#F2EFE7] hover:bg-[#006A71]">
          Login
        </NavLink>
      )}
      {!user && (
        <NavLink to="/register" className="btn btn-sm bg-[#006A71] text-[#F2EFE7] hover:bg-[#48A6A7]">
          Register
        </NavLink>
      )}
      {user && (
        <button className="btn btn-ghost btn-circle hover:bg-[#9ACBD0]/20">
          <IoIosNotifications size={22} className="text-[#006A71]" />
        </button>
      )}
      {user && (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-[#9ACBD0]/20">
            <div className="rounded-full flex justify-center items-center">
              {userData?.photo ? (
                <img src={userData.photo} alt="User" className="rounded-full w-10 h-10 object-cover" />
              ) : (
                <CgProfile size={40} className="text-[#006A71]" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#F2EFE7] rounded-box w-40 border border-[#9ACBD0]"
          >
            <li>
              <Link to="/dashboard" className="text-[#006A71] hover:bg-[#9ACBD0]/30">
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={logOutUser} className="text-[#006A71] hover:bg-[#9ACBD0]/30">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="navbar fixed top-0 left-0 z-50 w-full bg-[#F2EFE7] border-b border-[#9ACBD0] shadow-sm min-h-[60px] py-2 text-[#006A71] font-semibold">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-[#9ACBD0]/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#006A71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#F2EFE7] rounded-box w-52 border border-[#9ACBD0]">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="cursor-pointer">
          <h1 className='text-2xl font-bold text-[#006A71]'>HavenSpace</h1>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {loginSection}
      </div>
    </div>
  );
};

export default Navbar;