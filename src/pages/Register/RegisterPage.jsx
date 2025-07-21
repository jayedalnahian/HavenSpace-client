import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaImage,
  FaGlobe,
  FaCalendarAlt,
  FaUpload,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../CustomHooks/useAuth";

const IMGBB_API_KEY = "2e1c7fe21ce6c1d4a08100cd99fc90f8";
const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

const RegisterPage = () => {
  const { registerUser, googleLogin, user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload a JPG, PNG, GIF, or WEBP image.",
      });
      return;
    }

    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Maximum file size is 5MB.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", IMGBB_API_KEY);

    try {
      setIsUploading(true);
      const response = await axios.post(IMGBB_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        setPhotoUrl(imageUrl);
        setValue("photo", imageUrl);
        Swal.fire({
          icon: "success",
          title: "Image uploaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const saveUserMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        userData
      );
      if (res.status !== 200) {
        throw new Error("Failed to save user data");
      }
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({ icon: "success", title: "Registered successfully!" });
      reset();
      navigate("/login");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: error.message,
      });
    },
  });

  const onSubmit = async (data) => {
    const { name, email, photo, birth, phone, country, password } = data;

    try {
      const userCredential = await registerUser(email, password);

      const userData = {
        name,
        email,
        photo: photo || photoUrl,
        birth,
        phone,
        country,
        role: "user",
        uid: userCredential.user.uid,
        createdAt: new Date(),
      };

      saveUserMutation.mutate(userData);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      Swal.fire({ icon: "success", title: "Google Login Success" });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EFE7] p-4">
      <div className="w-full max-w-lg p-8 rounded-xl bg-white shadow-lg border border-[#9ACBD0]">
        <h2 className="text-2xl font-bold text-center text-[#006A71] mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <InputField
              icon={<FaUser className="text-[#48A6A7]" />}
              name="name"
              label="Full Name"
              register={register}
              required
              errors={errors}
            />
            <InputField
              icon={<FaEnvelope className="text-[#48A6A7]" />}
              name="email"
              label="Email"
              register={register}
              required
              errors={errors}
              type="email"
            />
            <InputField
              icon={<FaPhone className="text-[#48A6A7]" />}
              name="phone"
              label="Phone Number"
              register={register}
              required
              errors={errors}
            />
            <InputField
              icon={<FaGlobe className="text-[#48A6A7]" />}
              name="country"
              label="Country"
              register={register}
              required
              errors={errors}
            />
            <InputField
              icon={<FaCalendarAlt className="text-[#48A6A7]" />}
              name="birth"
              label="Date of Birth"
              register={register}
              required
              errors={errors}
              type="date"
            />
            
            {/* Image Upload Field */}
            <div className="space-y-1">
              <label htmlFor="photo" className="block text-sm font-medium text-[#006A71]">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="photo-upload"
                  className={`flex-1 cursor-pointer border-2 border-dashed rounded-md p-4 text-center transition-colors ${
                    isUploading
                      ? "border-[#48A6A7] bg-[#48A6A7]/10"
                      : "border-[#9ACBD0] hover:border-[#48A6A7] hover:bg-[#48A6A7]/10"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {isUploading ? (
                      <div className="flex items-center gap-2 text-[#48A6A7]">
                        <svg
                          className="animate-spin h-5 w-5"
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
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <FaUpload className="text-[#48A6A7] text-xl" />
                        <span className="text-sm text-[#006A71]">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-500">
                          (Supports: JPG, PNG, GIF, WEBP. Max 5MB)
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              {photoUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-[#006A71]">Uploaded:</span>
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
              )}
              <input
                type="hidden"
                {...register("photo")}
              />
            </div>

            <InputField
              icon={<FaLock className="text-[#48A6A7]" />}
              name="password"
              label="Password"
              register={register}
              required
              errors={errors}
              type="password"
              validation={{
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: (value) =>
                  (/[A-Z]/.test(value) &&
                    /[a-z]/.test(value) &&
                    /[0-9]/.test(value)) ||
                  "Password must contain uppercase, lowercase, and numbers",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={saveUserMutation.isPending}
            className="w-full py-3 rounded-md bg-[#48A6A7] text-white hover:bg-[#006A71] transition-colors duration-200 font-medium"
          >
            {saveUserMutation.isPending ? (
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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-[#9ACBD0]"></div>
          <span className="mx-4 text-sm text-[#006A71]">OR</span>
          <div className="flex-grow border-t border-[#9ACBD0]"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 border rounded-md border-[#48A6A7] text-[#006A71] hover:bg-[#48A6A7]/10 transition-colors duration-200 font-medium"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="text-center mt-6 text-sm text-[#006A71]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#48A6A7] hover:text-[#006A71] hover:underline transition-colors duration-200"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputField = ({
  icon,
  name,
  label,
  register,
  required = true,
  errors,
  type = "text",
  validation,
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-[#006A71]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={name}
        type={type}
        {...register(name, {
          required: required && `${label} is required`,
          ...validation,
        })}
        className="w-full pl-10 pr-3 py-2.5 border rounded-md focus:ring-2 focus:outline-none text-[#006A71] border-[#9ACBD0] focus:ring-[#48A6A7]/50 focus:border-[#48A6A7]"
      />
    </div>
    {errors[name] && (
      <p className="text-sm text-red-600 mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default RegisterPage;