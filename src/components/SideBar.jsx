import React from 'react';
import { FaRegEye, FaRegHeart, FaHistory, FaEnvelope } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full max-w-[80vw] md:w-80 bg-white shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-xl text-gray-600 hover:text-black focus:outline-none"
      >
        ✕
      </button>

      {/* Sidebar Content */}
      <div className="p-6 pt-12 text-sm">
        {/* User Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            👤
          </div>
          <div>
            <p className="text-gray-800 font-semibold">Hello 👋</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="flex items-center gap-1">✅ Easy Contact with sellers</p>
              <p className="flex items-center gap-1">✅ Personalized experience</p>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2 rounded-full w-full mb-6">
          Login
        </button>

        {/* Activity Section */}
        <div className="border-t pt-4">
          <p className="font-semibold text-gray-800 mb-4">My Activity</p>
          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Contacted */}
            <div className="bg-gray-100 rounded-lg p-3">
              <FaEnvelope className="mx-auto text-purple-600 mb-1 text-lg" />
              <p className="text-xs text-gray-700">Contacted</p>
              <p className="text-sm font-bold">00</p>
            </div>

            {/* Seen */}
            <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-500">
              <FaRegEye className="mx-auto text-indigo-600 mb-1 text-lg" />
              <p className="text-xs text-gray-700">Seen</p>
              <p className="text-sm font-bold">00</p>
            </div>

            {/* Saved */}
            <div className="bg-gray-100 rounded-lg p-3">
              <FaRegHeart className="mx-auto text-pink-500 mb-1 text-lg" />
              <p className="text-xs text-gray-700">Saved</p>
              <p className="text-sm font-bold">00</p>
            </div>

            {/* Recent */}
            <div className="bg-gray-100 rounded-lg p-3">
              <FaHistory className="mx-auto text-gray-500 mb-1 text-lg" />
              <p className="text-xs text-gray-700">Recent</p>
              <p className="text-sm font-bold">00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
