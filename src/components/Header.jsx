import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#4e2dd1] to-[#6f49ea] rounded-bl-[3rem] rounded-br-[3rem] shadow-lg select-none">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 text-white gap-2 sm:gap-0">
        
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold flex items-center gap-1 cursor-default">
          <span className="text-yellow-400 text-2xl">▴</span>
          Urbandom<span className="text-white">.com</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center sm:justify-end">
          {/* Post Property Link */}
          <Link
            to="/dashboard"
            className="bg-white text-pink-600 px-3 py-1 rounded-full font-semibold"
          >
            Post Property
          </Link>

          {/* Avatar + Sidebar Menu */}
          <div
            className="bg-white text-black rounded-full px-2 py-1 flex items-center gap-2 shadow cursor-pointer"
            onClick={onToggleSidebar}
          >
            <FiMenu className="text-xl pointer-events-none" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm pointer-events-none">
              👤
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
