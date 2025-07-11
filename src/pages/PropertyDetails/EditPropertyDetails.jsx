import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaSave, FaSpinner } from 'react-icons/fa';


import useSingleProperty from '../../CustomHooks/useSingleProperty';
import useAxiosInterceptor from '../../CustomHooks/useAxiosInterceptor';
import useUpdateProperty from '../../CustomHooks/useUpdateProperty';

const propertyTypes = [
  'Residential',
  'Commercial',
  'Land',
  'Villa',
  'Apartment',
  'Townhouse'
];

const propertyFeatures = [
  'Balcony',
  'Garden',
  'Swimming Pool',
  'Security',
  'Parking',
  'Furnished',
  'Fireplace',
  'Gym'
];

const availabilityOptions = [
  'Available',
  'Pending',
  'Sold'
];

const EditPropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { property, isLoading, error } = useSingleProperty(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: updateProperty, isPending } = useUpdateProperty();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  // Set form values when property data is loaded
  useEffect(() => {
    if (property) {
      setValue('title', property.title);
      setValue('description', property.description);
      setValue('location', property.location);
      setValue('minPrice', property.minPrice);
      setValue('maxPrice', property.maxPrice);
      setValue('bedrooms', property.bedrooms);
      setValue('bathrooms', property.bathrooms);
      setValue('areaSize', property.areaSize);
      setValue('propertyType', property.propertyType);
      setValue('features', property.features || []);
      setValue('image', property.image);
      setValue('availability', property.availability);
    }
  }, [property, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await updateProperty({ id, updatedData: data });
      navigate("/dashboard/agent/my-properties");
    } catch (err) {
      console.error("Update failed", err);
    } finally{
        setIsSubmitting(false)
    }
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = watch('features') || [];
    if (currentFeatures.includes(feature)) {
      setValue('features', currentFeatures.filter(f => f !== feature));
    } else {
      setValue('features', [...currentFeatures, feature]);
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#F2EFE7' }}>
        <FaSpinner className="animate-spin text-4xl" style={{ color: '#48A6A7' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#F2EFE7' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#006A71' }}>Error Loading Property</h2>
          <p className="text-red-500 mb-6">{error.message}</p>
          <button
            onClick={() => navigate('/dashboard/agent/my-properties')}
            className="px-4 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: '#48A6A7',
              color: '#F2EFE7'
            }}
          >
            Back to My Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard/agent/my-properties')}
          className="flex items-center mb-6 text-[#006A71] hover:text-[#48A6A7] transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to My Properties
        </button>

        <h1 className="text-3xl font-bold mb-8" style={{ color: '#006A71' }}>
          Edit Property Details
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                  Title*
                </label>
                <input
                  type="text"
                  className={`w-full p-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <p className="mt-1 text-red-500">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                  Description*
                </label>
                <textarea
                  rows={4}
                  className={`w-full p-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p className="mt-1 text-red-500">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                  Location*
                </label>
                <input
                  type="text"
                  className={`w-full p-3 rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                  {...register('location', { required: 'Location is required' })}
                />
                {errors.location && <p className="mt-1 text-red-500">{errors.location.message}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                  Image URL*
                </label>
                <input
                  type="url"
                  className={`w-full p-3 rounded-lg border ${errors.image ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                  {...register('image', { required: 'Image URL is required' })}
                />
                {errors.image && <p className="mt-1 text-red-500">{errors.image.message}</p>}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                    Min Price ($)*
                  </label>
                  <input
                    type="number"
                    className={`w-full p-3 rounded-lg border ${errors.minPrice ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                    {...register('minPrice', { 
                      required: 'Minimum price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                  />
                  {errors.minPrice && <p className="mt-1 text-red-500">{errors.minPrice.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                    Max Price ($)*
                  </label>
                  <input
                    type="number"
                    className={`w-full p-3 rounded-lg border ${errors.maxPrice ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                    {...register('maxPrice', { 
                      required: 'Maximum price is required',
                      min: { value: 0, message: 'Price must be positive' },
                      validate: (value) => 
                        value >= watch('minPrice') || 'Max price must be greater than min price'
                    })}
                  />
                  {errors.maxPrice && <p className="mt-1 text-red-500">{errors.maxPrice.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                    Bedrooms*
                  </label>
                  <input
                    type="number"
                    className={`w-full p-3 rounded-lg border ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                    {...register('bedrooms', { 
                      required: 'Bedrooms count is required',
                      min: { value: 0, message: 'Must be 0 or more' }
                    })}
                  />
                  {errors.bedrooms && <p className="mt-1 text-red-500">{errors.bedrooms.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                    Bathrooms*
                  </label>
                  <input
                    type="number"
                    className={`w-full p-3 rounded-lg border ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                    {...register('bathrooms', { 
                      required: 'Bathrooms count is required',
                      min: { value: 0, message: 'Must be 0 or more' }
                    })}
                  />
                  {errors.bathrooms && <p className="mt-1 text-red-500">{errors.bathrooms.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                    Area Size (sqft)*
                  </label>
                  <input
                    type="number"
                    className={`w-full p-3 rounded-lg border ${errors.areaSize ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                    {...register('areaSize', { 
                      required: 'Area size is required',
                      min: { value: 0, message: 'Must be positive' }
                    })}
                  />
                  {errors.areaSize && <p className="mt-1 text-red-500">{errors.areaSize.message}</p>}
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                  Property Type*
                </label>
                <select
                  className={`w-full p-3 rounded-lg border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                  {...register('propertyType', { required: 'Property type is required' })}
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.propertyType && <p className="mt-1 text-red-500">{errors.propertyType.message}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium" style={{ color: '#006A71' }}>
                  Availability*
                </label>
                <select
                  className={`w-full p-3 rounded-lg border ${errors.availability ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#48A6A7]`}
                  {...register('availability', { required: 'Availability status is required' })}
                >
                  <option value="">Select availability</option>
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.availability && <p className="mt-1 text-red-500">{errors.availability.message}</p>}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <label className="block mb-4 font-medium" style={{ color: '#006A71' }}>
              Features
            </label>
            <div className="flex flex-wrap gap-3">
              {propertyFeatures.map(feature => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${watch('features')?.includes(feature) ? 'bg-[#48A6A7] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Agent Info (Readonly) */}
          {/* <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: '#F2EFE7' }}>
            <h3 className="font-medium mb-3" style={{ color: '#006A71' }}>Agent Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Agent Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100"
                  value={property?.agentName || ''}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Agent Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100"
                  value={property?.agentEmail || ''}
                  disabled
                />
              </div>
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-3 rounded-lg font-medium text-white transition-colors"
              style={{ 
                backgroundColor: '#48A6A7',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditPropertyDetails;