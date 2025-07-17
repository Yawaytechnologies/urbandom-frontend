import React, { useState } from 'react';
import {
  FaRegEye,
  FaRegHeart,
  FaHistory,
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activityCounts = {
    contacted: 2,
    seen: 5,
    saved: 3,
    recent: 8,
  };

  const activities = [
    { key: 'contacted', label: 'Contacted', icon: <FaEnvelope />, color: '#00BFA6' },
    { key: 'seen', label: 'Seen', icon: <FaRegEye />, color: '#6366f1' },
    { key: 'saved', label: 'Saved', icon: <FaRegHeart />, color: '#FF4F81' },
    { key: 'recent', label: 'Recent', icon: <FaHistory />, color: '#A1A1AA' },
  ];

  const handleNavigate = (type) => {
    navigate(`/activity?type=${type}`);
    onClose();
  };

  const handleLogout = () => {
    alert('Logging out...');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-72 z-[999] bg-white text-gray-800 border-l shadow-xl"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-r from-[#1a2650] to-[#4b2edd] text-white">
            <h2 className="text-lg font-bold">Hello 👋</h2>
            <button onClick={onClose} className="text-xl hover:text-red-300">&times;</button>
          </div>

          {/* AVATAR + DROPDOWN */}
          <div className="relative px-6 py-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <FaUserCircle className="text-3xl text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">John Doe</span>
            </div>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute mt-2 right-6 bg-white rounded-md shadow-lg z-10 border w-40"
              >
                <button
                  onClick={() => alert('Profile')}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </motion.div>
            )}
          </div>

          {/* ACTIVITY CARDS */}
          <div className="px-6">
            <h3 className="text-base font-semibold mb-3 text-gray-700">My Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              {activities.map(({ key, label, icon, color }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center shadow-sm cursor-pointer transition border border-gray-100"
                >
                  <div className="text-2xl mb-2" style={{ color }}>{icon}</div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <span className="inline-block mt-1 text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700 font-semibold">
                    {activityCounts[key] || 0}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 px-6 text-center text-xs text-gray-400 pb-6">
            Urbandom © {new Date().getFullYear()}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
