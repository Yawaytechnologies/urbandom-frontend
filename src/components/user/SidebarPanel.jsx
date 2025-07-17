import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';

const SidebarPanel = ({ onSelectMenu, user, selected }) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(user?.photo || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const menuItems = [
    { key: 'editProfile', label: 'Edit Profile', icon: <FaUserEdit /> },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sm:w-[260px] bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-xl"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-6 relative">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <div
          onClick={handleAvatarClick}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 p-[3px] shadow-lg cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-3xl text-purple-600">👤</span>
            )}
          </div>
        </div>
        <p className="font-semibold mt-3 text-base text-gray-800">{user?.name || 'Guest User'}</p>
        <p className="text-xs text-gray-500 break-words mt-1">{user?.email || 'guest@example.com'}</p>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            key={item.key}
            onClick={() => onSelectMenu(item.key)}
            className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              selected === item.key
                ? 'bg-purple-100 text-purple-700 shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span> {item.label}
          </motion.button>
        ))}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectMenu('logout')}
          className="w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition-all"
        >
          <FaSignOutAlt className="text-base" />
          Log Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SidebarPanel;
