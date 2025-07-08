import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { googleLogin, loginUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      easing: "ease-in-out-quad",
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      showSuccessAlert(
        "Login Successful!",
        "You've been logged in successfully"
      );
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setError(error.message || "Login failed. Please try again.");
      showErrorAlert("Login Failed", "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await googleLogin();
      showSuccessAlert(
        "Login Successful!",
        "You've been logged in with Google"
      );
      navigate(from, { replace: true });

      
    } catch (error) {
      console.error(error);
      setError(error.message || "Google login failed. Please try again.");
      showErrorAlert("Google Login Failed", error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const showSuccessAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "success",
      background: "#FFFBDE",
      color: "#4682A9",
      confirmButtonColor: "#749BC2",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "error",
      background: "#FFFBDE",
      color: "#4682A9",
      confirmButtonColor: "#749BC2",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#91C8E4]/20 to-[#4682A9]/10 p-4"
      data-aos="fade-in"
    >
      <div className="w-full max-w-md bg-[#FFFBDE] rounded-2xl shadow-xl overflow-hidden border border-[#91C8E4]/50">
        <div className="bg-gradient-to-r from-[#4682A9] to-[#749BC2] p-6 text-center">
          <h2 className="text-2xl font-bold text-[#FFFBDE]">Welcome Back</h2>
          <p className="text-[#FFFBDE]/90 mt-1">
            Sign in to access your economic insights
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#4682A9]">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-[#749BC2]" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-3 py-2 border border-[#91C8E4] rounded-lg focus:ring-2 focus:ring-[#749BC2] focus:border-transparent text-[#4682A9]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#4682A9]">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-[#749BC2]" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 border border-[#91C8E4] rounded-lg focus:ring-2 focus:ring-[#749BC2] focus:border-transparent text-[#4682A9]"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isLoading
                  ? "bg-[#749BC2] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#4682A9] to-[#749BC2] hover:from-[#3a6d8f] hover:to-[#5a86b0] text-[#FFFBDE]"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#91C8E4]/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FFFBDE] text-[#749BC2]">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-[#91C8E4] rounded-lg hover:bg-[#91C8E4]/10 transition-colors text-[#4682A9]"
            >
              <FcGoogle size={20} />
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </button>

            <p className="text-center text-sm text-[#749BC2]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#4682A9] hover:text-[#3a6d8f] transition-colors"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
