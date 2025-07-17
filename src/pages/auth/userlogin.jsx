import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userAuthAction';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, onSignupClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { user, loading, error } = useSelector((state) => state.userAuth);

   useEffect(() => {
    if (user) 
      {
      navigate('/BuyPage'); // Redirect to BuyPage after login
    }
  }, [user, navigate]);


  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const mobileNumber = form.mobileNumber.value;
  const password = form.password.value;

  console.log("Login attempt:", { mobileNumber, password });

  // Dispatch login action
  dispatch(loginUser({ phone: mobileNumber, password }));

  // Optionally close modal (if login succeeds, you can close it in useEffect instead)
  onClose();
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative mx-auto">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-3xl md:text-xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              pattern="\d{10}"
              required
              placeholder="Enter 10-digit mobile number"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-3 rounded hover:bg-purple-800 transition text-lg"
          >
            Log In
          </button>

          <p className="text-center text-sm md:text-base mt-4 text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => {
                onClose();
                onSignupClick(); // Must match prop name
              }}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
