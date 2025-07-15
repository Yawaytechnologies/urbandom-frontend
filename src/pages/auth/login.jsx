import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const { mobileNumber, password } = formData;

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      alert(`Logging in with Mobile Number: ${formData.mobileNumber}`);

      setFormData({
        mobileNumber: '',
        password: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center"
      style={{
        background:
          'linear-gradient(to right, rgba(106, 4, 157, 0.86), rgba(57, 8, 81, 0.9))',
      }}
    >
      {/* Left Section */}
      <section className="flex-1 text-white p-6 md:p-12 flex flex-col justify-center items-center text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-align-center">
          Welcome to Urbandom!
        </h1>

        <ul className="space-y-4 text-base md:text-xl max-w-md mx-auto md:mx-0">
          <li className="flex items-center space-x-3 justify-center md:justify-start">
            <FaCheckCircle className="text-purple-400 flex-shrink-0" />
            <span>Login with your phone number</span>
          </li>
          <li className="flex items-center space-x-3 justify-center md:justify-start">
            <FaCheckCircle className="text-purple-400 flex-shrink-0" />
            <span>Add property details</span>
          </li>
          <li className="flex items-center space-x-3 justify-center md:justify-start">
            <FaCheckCircle className="text-purple-400 flex-shrink-0" />
            <span>Get property activated fast</span>
          </li>
        </ul>
      </section>

      {/* Right Section */}
      <section className="relative flex-1 flex justify-center items-center p-6 lg:right-14 md:p-12 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center md:text-left">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
              error={errors.mobileNumber}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-2 rounded hover:bg-purple-800 transition"
            >
              Log In
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-purple-700 hover:underline font-semibold"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

const InputField = ({ label, name, type = 'text', value, onChange, error }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-700 ${
        error ? 'border border-red-500' : 'border border-gray-300'
      }`}
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default Login;
