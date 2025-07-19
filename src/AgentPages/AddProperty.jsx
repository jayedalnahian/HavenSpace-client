import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosInterceptor from "../CustomHooks/useAxiosInterceptor";
import Swal from "sweetalert2";
import useAuth from "../CustomHooks/useAuth";
import useUserData from "../CustomHooks/useUserData";

const IMGBB_API_KEY = "2e1c7fe21ce6c1d4a08100cd99fc90f8";
const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

const AddProperty = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const axiosInterceptor = useAxiosInterceptor();
  const {userData} = useUserData()
  const { user } = useAuth();
  // console.log(user);

  // Mock agent data (replace with your actual context/state)
  const agentData = {
    name: user?.displayName,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      agentName: agentData.name,
      agentEmail: agentData.email,
      agentId: agentData.id,
      availability: "Available",
      propertyType: "Apartment",
      features: [],
    },
  });

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Condo",
    "Townhouse",
    "Commercial",
    "Land",
    "Other",
  ];

  const featuresOptions = [
    "Garage",
    "Balcony",
    "Garden",
    "Swimming Pool",
    "Furnished",
    "Parking",
    "Security",
    "Elevator",
    "Air Conditioning",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Set the file for form submission
      setValue("imageFile", file);
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("key", IMGBB_API_KEY);

    try {
      const response = await fetch(IMGBB_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.data.url; // Return the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      // 1. Upload image first
      let imageUrl = "";
      if (formData.imageFile) {
        imageUrl = await uploadImageToImgBB(formData.imageFile);
      }

      // 2. Prepare the final property data
      const propertyData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        minPrice: Number(formData.minPrice),
        maxPrice: Number(formData.maxPrice),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        areaSize: Number(formData.areaSize),
        propertyType: formData.propertyType,
        features: formData.features || [],
        image: imageUrl,
        availability: formData.availability,
        creatorName: userData?.name,
        creatorEmail: user.email,
        creatorUID: user.uid,
        createdAt: new Date().toISOString(),
        advertiseStatus: "false",
        wishlistStatus: "false",
        wishlistUsersData: [],
        requestStatus: "normal",
        requestedUserData: [],
        soldStatus: "false",
        soldDetails: {},
        adminApproval: "pending"
      };

      // 3. API call to your backend
      // console.log("Final property data to submit:", propertyData);
      try {
        const { data } = await axiosInterceptor.post(
          "/api/properties",
          propertyData
        );

        if (data.insertedId) {
          await Swal.fire({
            title: "Property Added!",
            text: "Your property has been listed successfully.",
            icon: "success",
            background: "#F2EFE7",
            color: "#006A71",
            confirmButtonColor: "#48A6A7",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: false,
            didOpen: () => {
              // Show buttons on hover
              const popup = Swal.getPopup();
              popup.addEventListener("mouseenter", () => {
                Swal.showConfirmButton();
                Swal.showCloseButton();
              });
              popup.addEventListener("mouseleave", () => {
                Swal.hideConfirmButton();
                Swal.hideCloseButton();
              });
            },
          });
        }
      } catch (error) {
        console.error(
          "Error posting property:",
          error.response?.data || error.message
        );
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      toast.success("Property added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting property:", error);
      toast.error("Failed to add property. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "#F2EFE7" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#006A71" }}>
            Add New Property
          </h1>
          <p className="text-lg" style={{ color: "#006A71" }}>
            List your property on HavenSpace and connect with potential buyers
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Property Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Property Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Property Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Description should be at least 20 characters",
                    },
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Property Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Location *
                </label>
                <input
                  id="location"
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Property Image */}
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Property Image *
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Property preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Bathrooms */}
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Bathrooms *
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  {...register("bathrooms", {
                    required: "Number of bathrooms is required",
                    min: { value: 0, message: "Must be 0 or more" },
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.bathrooms ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.bathrooms && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bathrooms.message}
                  </p>
                )}
              </div>

              {/* Features */}
              <div>
                <label
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Features (Select multiple)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {featuresOptions.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`feature-${feature}`}
                        value={feature}
                        {...register("features")}
                        className="mr-2"
                      />
                      <label htmlFor={`feature-${feature}`}>{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Property Type */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  {...register("propertyType", {
                    required: "Property type is required",
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.propertyType ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.propertyType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>

              {/* Minimum Price */}
              <div>
                <label
                  htmlFor="minPrice"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Minimum Price ($) *
                </label>
                <input
                  id="minPrice"
                  type="number"
                  {...register("minPrice", {
                    required: "Minimum price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.minPrice ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.minPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.minPrice.message}
                  </p>
                )}
              </div>

              {/* Maximum Price */}
              <div>
                <label
                  htmlFor="maxPrice"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Maximum Price ($) *
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  {...register("maxPrice", {
                    required: "Maximum price is required",
                    min: { value: 0, message: "Price must be positive" },
                    validate: (value) =>
                      !minPrice ||
                      value >= minPrice ||
                      "Max price must be ≥ min price",
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.maxPrice ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.maxPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.maxPrice.message}
                  </p>
                )}
              </div>

              {/* Bedrooms */}
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Bedrooms *
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  min="0"
                  {...register("bedrooms", {
                    required: "Number of bedrooms is required",
                    min: { value: 0, message: "Must be 0 or more" },
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.bedrooms ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.bedrooms && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>

              {/* Area Size */}
              <div>
                <label
                  htmlFor="areaSize"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Area Size (sq ft) *
                </label>
                <input
                  id="areaSize"
                  type="number"
                  min="0"
                  {...register("areaSize", {
                    required: "Area size is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.areaSize ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: "#F2EFE7" }}
                />
                {errors.areaSize && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.areaSize.message}
                  </p>
                )}
              </div>

              {/* Hidden agent fields */}
              <input type="hidden" {...register("agentId")} />

              {/* Agent Name */}
              {/* <div>
                <label
                  htmlFor="agentName"
                  className="block mb-2 font-medium"
                  style={{ color: "#006A71" }}
                >
                  Agent Name
                </label>
                <input
                  id="agentName"
                  type="text"
                  readOnly
                  
                  {...register("agentName")}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                  style={{ backgroundColor: "#F2EFE7", color: "#006A71" }}
                />
              </div> */}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(to right, #48A6A7, #006A71)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #006A71, #48A6A7)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #48A6A7, #006A71)";
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Property..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
