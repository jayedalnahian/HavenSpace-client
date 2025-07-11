import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaUser, 
  FaUserTie, 
  FaUserShield,
  FaUserEdit,
  FaTrash,
  FaCalendarAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "user",
    createdAt: "2023-05-15T10:30:00",
    active: true
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "agent",
    createdAt: "2023-04-22T14:45:00",
    active: true
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "admin",
    createdAt: "2023-03-10T09:15:00",
    active: true
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "user",
    createdAt: "2023-06-05T16:20:00",
    active: false
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    role: "agent",
    createdAt: "2023-02-18T11:10:00",
    active: true
  }
];

const ManageUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Count users by role and status
  const userCounts = {
    total: users.length,
    active: users.filter(u => u.active).length,
    inactive: users.filter(u => !u.active).length,
    users: users.filter(u => u.role === 'user').length,
    agents: users.filter(u => u.role === 'agent').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  // Role badge styling
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'user':
        return 'bg-blue-100 text-blue-700';
      case 'agent':
        return 'bg-teal-100 text-teal-700';
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'user':
        return <FaUser className="mr-1" />;
      case 'agent':
        return <FaUserTie className="mr-1" />;
      case 'admin':
        return <FaUserShield className="mr-1" />;
      default:
        return <FaUser className="mr-1" />;
    }
  };

  // Handle role change
  const changeUserRole = (id, newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: newRole.toLowerCase() } : user
      ));
      toast.success(`User role changed to ${newRole}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Handle user deletion
  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.error('User deleted', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6" 
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 
          className="text-2xl md:text-3xl font-bold mb-6" 
          style={{ color: '#006A71' }}
        >
          Manage Users
        </h1>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-xl font-bold" style={{ color: '#006A71' }}>{userCounts.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-xl font-bold text-green-600">{userCounts.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Inactive</p>
            <p className="text-xl font-bold text-gray-600">{userCounts.inactive}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-xl font-bold text-blue-600">{userCounts.users}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Agents</p>
            <p className="text-xl font-bold text-teal-600">{userCounts.agents}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-xl font-bold text-purple-600">{userCounts.admins}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
              style={{ backgroundColor: '#FFFFFF' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A6A7] appearance-none"
              style={{ backgroundColor: '#FFFFFF' }}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="User">Users</option>
              <option value="Agent">Agents</option>
              <option value="Admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {currentUsers.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md min-w-max">
              <table className="w-full divide-y divide-gray-200">
                <thead>
                  <tr style={{ backgroundColor: '#9ACBD0' }}>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Joined</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" style={{ color: '#006A71' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* User Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200">
                                <FaUser className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4 min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: '#006A71' }}>{user.name}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Email Column */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm truncate" style={{ color: '#48A6A7' }}>{user.email}</div>
                      </td>
                      
                      {/* Role Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      
                      {/* Date Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {formatDateTime(user.createdAt)}
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {user.role !== 'agent' && (
                            <button
                              onClick={() => changeUserRole(user.id, 'Agent')}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#9ACBD0',
                                color: '#006A71'
                              }}
                            >
                              <FaUserTie className="mr-1" /> Make Agent
                            </button>
                          )}
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => changeUserRole(user.id, 'Admin')}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#48A6A7',
                                color: '#F2EFE7'
                              }}
                            >
                              <FaUserShield className="mr-1" /> Make Admin
                            </button>
                          )}
                          {user.role !== 'user' && (
                            <button
                              onClick={() => changeUserRole(user.id, 'User')}
                              className="flex items-center px-2 py-1 rounded-lg text-xs"
                              style={{ 
                                backgroundColor: '#FFFFFF',
                                color: '#006A71',
                                border: '1px solid #006A71'
                              }}
                            >
                              <FaUser className="mr-1" /> Make User
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="flex items-center px-2 py-1 rounded-lg text-xs"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              color: '#EF4444',
                              border: '1px solid #EF4444'
                            }}
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-xl mb-2" style={{ color: '#006A71' }}>
                No users found
              </p>
              <p className="text-gray-600">
                {searchTerm || roleFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No users have been registered yet"}
              </p>
              {(searchTerm || roleFilter !== 'All') && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: '#48A6A7',
                    color: '#F2EFE7'
                  }}
                  onClick={() => {
                    setSearchTerm('');
                    setRoleFilter('All');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-16 w-16">
                      {user.avatar ? (
                        <img className="h-16 w-16 rounded-full object-cover" src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="h-16 w-16 rounded-full flex items-center justify-center bg-gray-200">
                          <FaUser className="text-gray-500 text-2xl" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium" style={{ color: '#006A71' }}>{user.name}</h3>
                      <p className="text-sm" style={{ color: '#48A6A7' }}>{user.email}</p>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center mb-2">
                      <FaCalendarAlt className="mr-2" style={{ color: '#9ACBD0' }} />
                      <span className="text-sm">Joined: {formatDateTime(user.createdAt)}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {user.role !== 'agent' && (
                        <button
                          onClick={() => changeUserRole(user.id, 'Agent')}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#9ACBD0',
                            color: '#006A71'
                          }}
                        >
                          <FaUserTie className="mr-1" /> Make Agent
                        </button>
                      )}
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => changeUserRole(user.id, 'Admin')}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#48A6A7',
                            color: '#F2EFE7'
                          }}
                        >
                          <FaUserShield className="mr-1" /> Make Admin
                        </button>
                      )}
                      {user.role !== 'user' && (
                        <button
                          onClick={() => changeUserRole(user.id, 'User')}
                          className="flex items-center px-3 py-1 rounded-lg text-xs"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            color: '#006A71',
                            border: '1px solid #006A71'
                          }}
                        >
                          <FaUser className="mr-1" /> Make User
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center px-3 py-1 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#EF4444',
                          border: '1px solid #EF4444'
                        }}
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg mb-2" style={{ color: '#006A71' }}>
                No users found
              </p>
              <p className="text-gray-600 text-sm">
                {searchTerm || roleFilter !== 'All' 
                  ? "Try adjusting your search or filters" 
                  : "No users have been registered yet"}
              </p>
              {(searchTerm || roleFilter !== 'All') && (
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: '#48A6A7',
                    color: '#F2EFE7'
                  }}
                  onClick={() => {
                    setSearchTerm('');
                    setRoleFilter('All');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full disabled:opacity-50"
                style={{ 
                  backgroundColor: currentPage === 1 ? '#9ACBD0' : '#48A6A7',
                  color: '#F2EFE7'
                }}
              >
                <FaChevronLeft />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full ${currentPage === page ? 'bg-[#006A71] text-white' : 'bg-[#9ACBD0] text-[#006A71]'}`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full disabled:opacity-50"
                style={{ 
                  backgroundColor: currentPage === totalPages ? '#9ACBD0' : '#48A6A7',
                  color: '#F2EFE7'
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;