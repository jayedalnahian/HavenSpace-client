import React from "react";
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
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../CustomHooks/useAuth";


const RegisterPage = () => {
  const { registerUser, googleLogin, user } = useAuth()
  console.log(user);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const saveUserMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        userData
      );
      console.log(res);

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
      console.log(error);

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
        photo,
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
            <InputField
              icon={<FaImage className="text-[#48A6A7]" />}
              name="photo"
              label="Profile Photo URL (optional)"
              register={register}
              required={false}
              errors={errors}
            />
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
