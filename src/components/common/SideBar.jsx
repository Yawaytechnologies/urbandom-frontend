import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUserCircle, FaSignOutAlt, FaEnvelope, FaRegEye, FaRegHeart, FaHistory, FaChevronLeft, FaUserEdit,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signupThunk,
  loginThunk,
  getUserProfileThunk,
} from "../../redux/actions/userLoginAction"; // thunks only
import { logout } from "../../redux/reducer/userLoginSlice"; // logout comes from the slice

const activities = [
  { key: "contacted", label: "Contacted", icon: <FaEnvelope />, color: "#00BFA6" },
  { key: "seen", label: "Seen", icon: <FaRegEye />, color: "#6366f1" },
  { key: "saved", label: "Saved", icon: <FaRegHeart />, color: "#FF4F81" },
  { key: "recent", label: "Recent", icon: <FaHistory />, color: "#A1A1AA" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, status, error } = useSelector((state) => state.userLogin ?? {});

  const [showLogin, setShowLogin] = useState(!user);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    userPassword: "",
    phone: "",
    firstName: "",
    lastName: "",
    userProfile: null,
  });

  // Restore from localStorage and fetch profile if available
  useEffect(() => {
    const localToken = token || localStorage.getItem("token");
    const localId = user?.id || localStorage.getItem("userId");
    if (localToken && localId) {
      dispatch(getUserProfileThunk({ id: localId, token: localToken }));
    }
    setShowLogin(!user);
  }, [user, token, dispatch]); // <- FIXED: now correct exhaustive-deps

  // Save token & id to localStorage after login/signup
  useEffect(() => {
    if (user?.id && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
    }
  }, [user?.id, token]);

  // --- File upload handler ---
  const handleFileChange = (e) => {
    setLoginForm((f) => ({ ...f, userProfile: e.target.files[0] }));
  };

  // --- Signup handler ---
  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", loginForm.username);
    formData.append("email", loginForm.email);
    formData.append("userPassword", loginForm.userPassword);
    formData.append("phone", loginForm.phone);
    formData.append("firstName", loginForm.firstName);
    formData.append("lastName", loginForm.lastName);
    if (loginForm.userProfile) formData.append("userProfile", loginForm.userProfile);
    dispatch(signupThunk(formData)).then((res) => {
      if (!res.error) setShowLogin(false);
    });
  };

  // --- Login handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ email: loginForm.email, userPassword: loginForm.userPassword })).then((res) => {
      if (!res.error) setShowLogin(false);
    });
  };

  // --- Logout handler ---
  const handleLogout = () => {
    dispatch(logout());
    setShowLogin(true);
    setShowProfile(false);
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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const handleActivityClick = (key) => {
    if (key === "profile") {
      navigate("/useractivity");
    } else {
      navigate(`/activity?type=${key}`);
    }
    onClose();
  };

  const activityCounts = { contacted: 2, seen: 5, saved: 3, recent: 8 }; // replace with real data

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className={`
            fixed top-0 right-0 h-full
            w-full sm:w-[23rem] max-w-[95vw]
            z-[999] bg-white/80 text-gray-900
            border-l-0 backdrop-blur-md
            shadow-[0_6px_32px_rgba(80,70,255,0.09)]
            flex flex-col
          `}
          style={{ boxShadow: "0 8px 32px 0 rgba(80,70,255,0.09),0 1.5px 12px 0 rgba(120,90,255,0.09)" }}
        >
          {/* Header */}
          <div className="relative flex justify-between items-center px-4 sm:px-7 py-5 sm:py-6 bg-gradient-to-r from-[#1a2650] via-[#4b2edd] to-[#1a2650] rounded-bl-3xl shadow-lg overflow-hidden">
            <span className="absolute left-4 sm:left-7 top-2 animate-bounce">
              <BsStars className="text-yellow-400 text-lg sm:text-xl drop-shadow" />
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold tracking-wide drop-shadow text-white font-[Poppins] flex items-center gap-2">
              Welcome{" "}
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
                className="inline-block"
              >
                👋
              </motion.span>
            </h2>
            <button
              onClick={onClose}
              className="text-2xl sm:text-3xl text-white/70 hover:text-red-300 font-extrabold transition px-2 py-0.5"
              aria-label="Close"
            >
              &times;
            </button>
            <span className="absolute right-4 sm:right-8 bottom-1 animate-pulse">
              <BsStars className="text-sky-300 text-base sm:text-lg drop-shadow" />
            </span>
          </div>

          {/* Login/Signup form */}
          {showLogin ? (
            <div className="flex flex-col items-center justify-center px-4 py-5 sm:p-8 animate-fade-in flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#a88bfd] to-[#67e8f9] flex items-center justify-center mb-3 sm:mb-4 shadow-lg relative"
              >
                <FaUserCircle className="text-3xl sm:text-5xl text-white drop-shadow-glow" />
                <BsStars className="absolute right-1 top-2 text-yellow-200 text-xs animate-spin-slow" />
              </motion.div>
              <img src="/housing-logo.png" alt="Logo" className="w-20 sm:w-28 mb-1 sm:mb-2 rounded-lg shadow-sm" />
              <div className="text-base sm:text-lg font-bold text-[#3b3074] text-center mb-1">
                Your Trusted Real Estate Partner
              </div>
              <form
                className="w-full mt-3 sm:mt-4"
                onSubmit={isNewUser ? handleSignup : handleLogin}
                autoComplete="off"
              >
                {isNewUser && (
                  <>
                    <input
                      type="text"
                      placeholder="Username"
                      value={loginForm.username}
                      onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#4b2edd] focus:outline-none shadow transition text-sm"
                      autoFocus
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#4b2edd] focus:outline-none shadow transition text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={loginForm.phone}
                      onChange={e => setLoginForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#00BFA6] focus:outline-none shadow transition text-sm"
                      maxLength={10}
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={loginForm.firstName}
                      onChange={e => setLoginForm(f => ({ ...f, firstName: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#4b2edd] focus:outline-none shadow transition text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={loginForm.lastName}
                      onChange={e => setLoginForm(f => ({ ...f, lastName: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#4b2edd] focus:outline-none shadow transition text-sm"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full mb-3 text-xs"
                    />
                  </>
                )}
                {!isNewUser && (
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#4b2edd] focus:outline-none shadow transition text-sm"
                    autoFocus
                  />
                )}
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.userPassword}
                  onChange={e => setLoginForm(f => ({ ...f, userPassword: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 mb-3 border border-[#e5eafe] rounded-xl focus:ring-2 focus:ring-[#ff4f81] focus:outline-none shadow transition text-sm"
                />

                {/* Show error or loading */}
                {status === "failed" && <div className="text-xs text-red-500 mb-2">{error}</div>}
                {status === "loading" && <div className="text-xs text-blue-500 mb-2">Please wait...</div>}

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 16px 2px #00bfa69c" }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00BFA6] via-[#4b2edd] to-[#ff4f81] hover:opacity-95 text-white font-bold py-2 rounded-xl mb-2 sm:mb-3 transition text-base shadow-lg tracking-wide"
                >
                  {isNewUser ? "Sign Up" : "Login"}
                </motion.button>
                <button
                  type="button"
                  className="w-full text-xs text-[#4b2edd] underline hover:text-[#ff4f81] transition"
                  onClick={() => setIsNewUser(v => !v)}
                >
                  {isNewUser ? "Already have an account? Login" : "New user? Create account"}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Profile & Activity view toggle */}
              {!showProfile ? (
                // ACTIVITY VIEW
                <div className="flex-1 overflow-y-auto px-2 sm:px-4 pt-3 pb-2">
                  {/* My Profile - clickable */}
                  <div
                    className="flex items-center bg-white rounded-xl shadow-lg mb-4 px-4 py-4 cursor-pointer hover:shadow-2xl transition border border-gray-100"
                    onClick={() => setShowProfile(true)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="relative">
                        {user?.userProfile ? (
                          <img
                            src={user.userProfile}
                            alt="Profile"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border object-cover bg-gray-100"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl sm:text-4xl text-[#4b2edd]" />
                        )}
                        <BsStars className="absolute right-0 top-2 text-yellow-300 animate-pulse" />
                      </span>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-[#1a2650]">{user?.username || user?.name}</div>
                        <div className="text-xs sm:text-sm text-[#4b2edd]">{user?.phone || user?.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-2 flex items-center gap-1 text-red-500 text-xs sm:text-sm px-3 py-1 rounded-lg hover:bg-[#fff0f5] transition font-semibold shadow"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold mb-3 text-[#3b3074] tracking-wide px-2">My Activity</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {activities.map(({ key, label, icon, color }) => (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        key={key}
                        onClick={() => handleActivityClick(key)}
                        className="flex flex-col items-center bg-white/90 hover:bg-[#f3f1ff] rounded-2xl py-6 px-3 shadow border border-[#e5eafe] cursor-pointer transition"
                        style={{ pointerEvents: "auto" }}
                      >
                        <div className="text-2xl mb-2" style={{ color }}>{icon}</div>
                        <div className="text-sm font-semibold text-[#3b3074]">{label}</div>
                        <span className="mt-2 text-xs bg-[#e5eafe] px-2 py-1 rounded-full text-[#4b2edd] font-bold">
                          {activityCounts[key] || 0}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                // PROFILE VIEW
                <div className="flex-1 overflow-y-auto px-2 sm:px-4 pt-3 pb-2">
                  <button
                    className="flex items-center text-[#4b2edd] text-xs sm:text-sm font-bold mb-4 hover:underline gap-1"
                    onClick={() => setShowProfile(false)}
                  >
                    <FaChevronLeft /> Back to Activity
                  </button>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl px-6 py-8 shadow-2xl flex flex-col items-center"
                  >
                    <span className="relative mb-2">
                      {user?.userProfile ? (
                        <img
                          src={user.userProfile}
                          alt="Profile"
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border object-cover bg-gray-100"
                        />
                      ) : (
                        <FaUserCircle className="text-5xl text-[#4b2edd] drop-shadow" />
                      )}
                      <BsStars className="absolute right-1 top-2 text-yellow-300 animate-bounce" />
                    </span>
                    <div className="text-xl font-bold text-[#1a2650]">{user?.username || user?.name}</div>
                    <div className="text-sm text-[#4b2edd] mb-1">{user?.phone}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                    <button
                      className="mt-5 px-4 py-2 flex items-center gap-2 bg-[#ede9fe] hover:bg-[#c7d2fe] text-[#6d28d9] rounded-lg shadow text-sm font-semibold transition"
                      onClick={() => handleActivityClick("profile")}
                    >
                      <FaUserEdit /> Edit Profile
                    </button>
                  </motion.div>
                </div>
              )}
            </>
          )}
          <div className="mt-auto px-4 sm:px-6 text-center text-xs text-[#b4b6cf] pb-6 sm:pb-7 font-medium tracking-wider">
            <span className="font-bold text-[#1a2650]">Urbandom</span> © {new Date().getFullYear()}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
