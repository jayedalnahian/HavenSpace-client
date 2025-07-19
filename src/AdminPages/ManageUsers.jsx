import React, { useState } from "react";
import {
  FaUser,
  FaUserTie,
  FaUserShield,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useAllUsers from "../CustomHooks/useAllUsers";
import useUpdateUserRole from "../CustomHooks/useUpdateUserRole";
import useAdminDeleteUser from "../CustomHooks/useAdminDeleteUser";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { allUsers, isLoading, error, refetch } = useAllUsers();
  const { updateUserRole } = useUpdateUserRole();
  const { deleteUserByUID, loading } = useAdminDeleteUser();

  const handleMakeAdmin = (userId) => {
    updateUserRole(userId, "admin");
    refetch();

    // call your handler function here
  };

  const handleMakeAgent = (userId) => {
    updateUserRole(userId, "agent");
    refetch();
    // call your handler function here
  };

  const handleMarkAsFraud = (userId) => {
    updateUserRole(userId, "fraud");
    refetch();
    // call your handler function here
  };

  const handleDeleteUser = async (user) => {
    console.log(user);

    Swal.fire({
      title: `Delete ${user.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteUserByUID(user.uid);
        if (result.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Delete Unsuccessful",
            icon: "error",
          });
        }
      }
    });

    refetch();
    // call your handler function here
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F2EFE7" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#006A71" }}>
          Manage Users
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-md">
            <thead>
              <tr style={{ backgroundColor: "#9ACBD0" }}>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold uppercase"
                  style={{ color: "#006A71" }}
                >
                  Name
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold uppercase"
                  style={{ color: "#006A71" }}
                >
                  Email
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold uppercase"
                  style={{ color: "#006A71" }}
                >
                  Role
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold uppercase"
                  style={{ color: "#006A71" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUsers?.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photo || ""}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-[#006A71]">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#48A6A7]">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm capitalize">{user.role}</td>
                  <td className="px-4 py-3 flex gap-3">
                    {user.role === "fraud" ? (
                      <span className="text-red-600 font-semibold">Fraud</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg"
                          >
                            <FaUserShield /> Make Admin
                          </button>
                        )}
                        {user.role !== "agent" && (
                          <button
                            onClick={() => handleMakeAgent(user._id)}
                            className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-lg"
                          >
                            <FaUserTie /> Make Agent
                          </button>
                        )}
                        {user.role === "agent" && (
                          <button
                            onClick={() => handleMarkAsFraud(user._id)}
                            className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-lg"
                          >
                            <FaExclamationTriangle /> Mark as Fraud
                          </button>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-600 text-xs rounded-lg"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {isLoading && (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          )}

          {error && (
            <div className="text-center py-4 text-red-500">
              Error loading users
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
