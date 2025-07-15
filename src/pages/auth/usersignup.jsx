import React, { useState } from 'react';

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    userImage: null, // <-- added
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'userImage') {
      setFormData(prev => ({ ...prev, userImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, phone, email, password } = formData;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      console.log('Signup successful:', formData);
      alert('Signup successful!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: '',
        userImage: null, // reset
      });
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative mx-auto max-h-[90vh] overflow-auto p-6 md:p-8"
      >
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl md:text-2xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full border px-3 py-3 md:py-2 rounded focus:outline-none focus:ring-2 transition ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="\d{10}"
              placeholder="10-digit phone number"
              className={`w-full border px-3 py-3 md:py-2 rounded focus:outline-none focus:ring-2 transition ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border px-3 py-3 md:py-2 rounded focus:outline-none focus:ring-2 transition ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={`w-full border px-3 py-3 md:py-2 rounded focus:outline-none focus:ring-2 transition ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Add user image */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Add User Image</label>
            <input
              type="file"
              name="userImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
            />
            {formData.userImage && (
              <img
                src={URL.createObjectURL(formData.userImage)}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-3 rounded hover:bg-purple-800 transition text-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-sm md:text-base mt-4 text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => {
                onClose();
                onLoginClick();
              }}
              className="text-purple-600 hover:underline font-semibold cursor-pointer"
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
