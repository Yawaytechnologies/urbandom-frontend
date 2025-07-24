import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import {
  signupThunk,
  loginThunk,
  getUserProfileThunk,
} from "../../redux/actions/userLoginAction";
import { logout } from "../../redux/reducer/userLoginSlice";

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user, token, status, error } = useSelector((state) => state.userLogin ?? {});
  const [isNewUser, setIsNewUser] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    userPassword: "",
    phone: "",
    firstName: "",
    lastName: "",
    userProfile: null,
  });

  useEffect(() => {
    const localToken = token || localStorage.getItem("token");
    const localId = user?.id || localStorage.getItem("userId");
    if (localToken && localId) {
      dispatch(getUserProfileThunk({ id: localId, token: localToken }));
    }
  }, [user, token, dispatch]);

  useEffect(() => {
    if (user?.id && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
    }
  }, [user?.id, token]);

  const handleFileChange = (e) => {
    setLoginForm((f) => ({ ...f, userProfile: e.target.files[0] }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(loginForm).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    dispatch(signupThunk(formData));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ phone: loginForm.phone, userPassword: loginForm.userPassword }));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoginForm({
      username: "",
      email: "",
      userPassword: "",
      phone: "",
      firstName: "",
      lastName: "",
      userProfile: null,
    });
    setIsNewUser(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className="fixed top-0 right-0 z-50 w-full sm:w-[24rem] h-full bg-white shadow-2xl overflow-y-auto"
        >
          <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gradient-to-br from-[#fdfbff] to-[#e7e9f8]">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#1a2650] flex items-center gap-1">
                <BsStars className="text-yellow-400 animate-pulse" /> Welcome
              </h2>
              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-red-500 font-bold"
              >
                &times;
              </button>
            </div>

            {/* Avatar */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-400 to-sky-400 flex items-center justify-center shadow-md mb-4">
              <FaUserCircle className="text-white text-4xl" />
              <BsStars className="absolute top-1 right-1 text-yellow-300 animate-bounce text-sm" />
            </div>

            {/* Logo */}
            <img
              src="/housing-logo.png"
              alt="Logo"
              className="w-20 h-auto mb-3 rounded"
              onError={(e) => (e.target.style.display = "none")}
            />

            {/* Title */}
            <h1 className="text-base sm:text-lg font-semibold text-[#1a2650] mb-4 text-center">
              Your Trusted Real Estate Partner
            </h1>

            {/* Auth Form */}
            <form
              onSubmit={isNewUser ? handleSignup : handleLogin}
              className="w-full max-w-sm space-y-3"
              autoComplete="off"
            >
              {isNewUser && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={loginForm.phone}
                    onChange={(e) => setLoginForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={loginForm.firstName}
                    onChange={(e) => setLoginForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={loginForm.lastName}
                    onChange={(e) => setLoginForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-700"
                  />
                </>
              )}

              {!isNewUser && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-indigo-300"
                  autoFocus
                />
              )}

              <input
                type="password"
                placeholder="Password"
                value={loginForm.userPassword}
                onChange={(e) => setLoginForm((f) => ({ ...f, userPassword: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border text-sm border-gray-300 focus:ring focus:ring-pink-300"
              />

              {status === "failed" && (
                <div className="text-xs text-red-600 text-center">{error || "Internal server error"}</div>
              )}
              {status === "loading" && (
                <div className="text-xs text-blue-600 text-center">Please wait...</div>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#00BFA6] via-[#4b2edd] to-[#ff4f81] text-white rounded-xl text-sm font-semibold shadow hover:opacity-95"
              >
                {isNewUser ? "Sign Up" : "Login"}
              </button>

              <button
                type="button"
                className="w-full text-xs text-center text-blue-700 mt-1 hover:underline"
                onClick={() => setIsNewUser((v) => !v)}
              >
                {isNewUser ? "Already have an account? Login" : "New user? Create account"}
              </button>
            </form>

            {user && (
              <button
                onClick={handleLogout}
                className="mt-6 text-sm text-red-500 font-medium underline hover:text-red-700"
              >
                <FaSignOutAlt className="inline-block mr-1" /> Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
