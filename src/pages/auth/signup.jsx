import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobilenumber: '',
    confirmPassword: '',
    email: '',
    userType: '',
    userImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'userImage') {
      setFormData((prev) => ({ ...prev, userImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.mobilenumber) newErrors.mobilenumber = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobilenumber))
      newErrors.mobilenumber = 'Mobile number must be exactly 10 digits';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.userType) newErrors.userType = 'Please select Owner or Builder';

    // Image validation
    if (!formData.userImage) {
      newErrors.userImage = 'User image is required';
    } else if (!formData.userImage.type.startsWith('image/')) {
      newErrors.userImage = 'Only image files are allowed';
    } else if (formData.userImage.size > 2 * 1024 * 1024) {
      newErrors.userImage = 'Image size should be under 2MB';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      alert(`Registered as ${formData.userType} with username: ${formData.username}`);
      setFormData({
        username: '',
        password: '',
        mobilenumber: '',
        confirmPassword: '',
        email: '',
        userType: '',
        userImage: null,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 px-6 md:px-12 xl:px-24 max-w-screen-xl mx-auto gap-10 md:gap-16 py-12">
      {/* Left Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-white md:p-12 space-y-8 text-center md:text-left max-w-lg md:max-w-none">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Urbandom</h1>
        <h2 className="text-lg md:text-2xl font-semibold leading-relaxed">
          Sell or rent your property faster with Urbandom
        </h2>
        <ul className="space-y-4 text-base md:text-lg max-w-md mx-auto md:mx-0">
          {[
            'Post property for free',
            'Get verified buyers',
            'Get personalised assistance on selling faster',
          ].map((text, index) => (
            <li key={index} className="flex items-start gap-3 justify-center md:justify-start">
              <FaCheckCircle className="mt-1 text-purple-300 flex-shrink-0" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Right Section */}
      <section className="flex-1 flex flex-col justify-start lg:justify-center items-center min-h-screen">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 md:w-full md:w-[130%] lg:w-[115%] md:max-w-5xl md:p-8 lg:p-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black text-center md:text-left">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <InputField
                label="Mobile Number"
                name="mobilenumber"
                type="tel"
                value={formData.mobilenumber}
                onChange={handleChange}
                error={errors.mobilenumber}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              {/* User Type */}
              <div>
                <label htmlFor="userType" className="block mb-1 font-medium text-gray-800">
                  For
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.userType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select an option</option>
                  <option value="owner">Owner</option>
                  <option value="builder">Builder</option>
                </select>
                {errors.userType && (
                  <p className="text-red-600 text-sm mt-1">{errors.userType}</p>
                )}
              </div>

              {/* User Image Upload */}
              <div className="lg:col-span-2">
                <label className="block mb-1 font-medium text-gray-800">Upload User Image</label>
                <input
                  type="file"
                  name="userImage"
                  accept="image/*"
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.userImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.userImage && (
                  <p className="text-red-600 text-sm mt-1">{errors.userImage}</p>
                )}

                {/* Image Preview */}
                {formData.userImage && (
                  <div className="mt-3 flex items-center gap-4">
                    <img
                      src={URL.createObjectURL(formData.userImage)}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-full border"
                    />
                    <span className="text-sm text-gray-600">{formData.userImage.name}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-3 px-4 rounded hover:bg-purple-800 transition text-lg"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

// Reusable input field
const InputField = ({ label, name, type = 'text', value, onChange, error }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-800">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 rounded border ${
        error ? 'border-red-500' : 'border-gray-300'
      } text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600`}
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default SignUpPage;
