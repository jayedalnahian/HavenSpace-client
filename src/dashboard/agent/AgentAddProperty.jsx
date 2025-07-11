import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgentAddProperty = () => {
  // Mock agent data (replace with your actual context/state)
  const agentData = {
    name: 'John Doe',
    email: 'john.doe@havenspace.com'
  };

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      agentName: agentData.name,
      agentEmail: agentData.email
    }
  });

  const minPrice = watch('minPrice');
  const maxPrice = watch('maxPrice');

  const onSubmit = async (data) => {
    try {
      // Here you would typically make an API call
      console.log('Form submitted:', data);
      
      // Show success toast
      toast.success('Property added successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      reset();
    } catch (error) {
      toast.error('Failed to add property. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: '#006A71' }}
          >
            Add New Property
          </h1>
          <p 
            className="text-lg"
            style={{ color: '#006A71' }}
          >
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
                  style={{ color: '#006A71' }}
                >
                  Property Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#F2EFE7' }}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Property Location */}
              <div>
                <label 
                  htmlFor="location"
                  className="block mb-2 font-medium"
                  style={{ color: '#006A71' }}
                >
                  Location *
                </label>
                <input
                  id="location"
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#F2EFE7' }}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>

              {/* Property Image */}
              <div>
                <label 
                  htmlFor="image"
                  className="block mb-2 font-medium"
                  style={{ color: '#006A71' }}
                >
                  Property Image *
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register('image', { required: 'Image is required' })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#F2EFE7' }}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Minimum Price */}
              <div>
                <label 
                  htmlFor="minPrice"
                  className="block mb-2 font-medium"
                  style={{ color: '#006A71' }}
                >
                  Minimum Price ($) *
                </label>
                <input
                  id="minPrice"
                  type="number"
                  {...register('minPrice', { 
                    required: 'Minimum price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${errors.minPrice ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#F2EFE7' }}
                />
                {errors.minPrice && (
                  <p className="mt-1 text-sm text-red-500">{errors.minPrice.message}</p>
                )}
              </div>

              {/* Maximum Price */}
              <div>
                <label 
                  htmlFor="maxPrice"
                  className="block mb-2 font-medium"
                  style={{ color: '#006A71' }}
                >
                  Maximum Price ($) *
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  {...register('maxPrice', { 
                    required: 'Maximum price is required',
                    min: { value: 0, message: 'Price must be positive' },
                    validate: value => 
                      !minPrice || value >= minPrice || 'Max price must be ≥ min price'
                  })}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${errors.maxPrice ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#F2EFE7' }}
                />
                {errors.maxPrice && (
                  <p className="mt-1 text-sm text-red-500">{errors.maxPrice.message}</p>
                )}
              </div>

              {/* Agent Name */}
              <div>
                <label 
                  htmlFor="agentName"
                  className="block mb-2 font-medium"
                  style={{ color: '#006A71' }}
                >
                  Agent Name
                </label>
                <input
                  id="agentName"
                  type="text"
                  readOnly
                  {...register('agentName')}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                  style={{ backgroundColor: '#F2EFE7', color: '#006A71' }}
                />
              </div>

              {/* Agent Email */}
              <div>
                <label 
                  htmlFor="agentEmail"
                  className="block mb-2 font-medium"
                  style={{ color: '#006A71' }}
                >
                  Agent Email
                </label>
                <input
                  id="agentEmail"
                  type="email"
                  readOnly
                  {...register('agentEmail')}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                  style={{ backgroundColor: '#F2EFE7', color: '#006A71' }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg"
              style={{
                background: 'linear-gradient(to right, #48A6A7, #006A71)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #006A71, #48A6A7)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #48A6A7, #006A71)';
              }}
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentAddProperty;