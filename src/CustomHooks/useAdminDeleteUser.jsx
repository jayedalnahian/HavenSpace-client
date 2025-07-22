import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const useAdminDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUserByUID = async (targetUID) => {
    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const res = await axios.delete(
        `https://b11a12-server-side-jayedalnahian.vercel.app/api/users/${targetUID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("Delete user error:", err);
      setError(err.response?.data?.error || "Failed to delete user");
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return { deleteUserByUID, loading, error };
};

export default useAdminDeleteUser;
