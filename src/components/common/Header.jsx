import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";

function Header({ onToggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-gradient-to-r from-[#1a2650]/90 to-[#131b32]/90 backdrop-bl-md shadow-md"
          : "bg-[#4b2edd]"
      }`}
    >
      {/* ✅ Mobile View */}
      <div className="sm:hidden flex items-center justify-between px-3 py-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 text-white font-bold text-base"
        >
          <span className="text-yellow-400 text-lg">▴</span>
          <span>Urbandom</span>
          <span className="text-purple-200">.com</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#ff4f81] font-semibold text-[10px] px-2 py-[3px] rounded-full shadow whitespace-nowrap"
          >
            Post Property
          </motion.button>

          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSidebar}
            className="flex items-center px-[6px] py-[5px] rounded-full bg-white text-gray-800 shadow cursor-pointer"
          >
            <FiMenu className="text-[16px]" />
            <div
              className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-white text-xs ml-1"
              style={{
                background: "linear-gradient(to bottom right, #7e5bef, #5e4eea)",
              }}
            >
              👤
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Tablet/Desktop View (unchanged) */}
      <div className="hidden sm:flex justify-between items-center px-6 py-3">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold flex items-center gap-1 text-white"
        >
          <span className="text-yellow-400 text-2xl">▴</span>
          <span>Urbandom</span>
          <span className="text-purple-200">.com</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-[#ff4f81] font-semibold px-4 py-1 rounded-full shadow-sm transition"
          >
            Post Property
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={onToggleSidebar}
            className="flex items-center gap-2 px-2 py-1 rounded-full bg-white text-gray-800 shadow cursor-pointer"
          >
            <FiMenu className="text-xl" />
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{
                background: "linear-gradient(to bottom right, #7e5bef, #5e4eea)",
              }}
            >
              👤
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Header;
