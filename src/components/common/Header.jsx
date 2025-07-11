import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";

function Header({ onToggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePostProperty = () => {
    navigate("/dashboard");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-gradient-to-r from-[#1a2650]/90 to-[#131b32]/90 backdrop-blur-md rounded-bl-[2rem] rounded-br-[2rem]"
            : "bg-[#4b2edd] shadow-md rounded-none"
        }
      `}
      style={{ color: "var(--text-primary)" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 gap-2 sm:gap-0 w-full">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full sm:w-auto flex justify-center sm:justify-start"
        >
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold flex items-center gap-1 cursor-pointer"
          >
            <span className="text-yellow-400 text-2xl">▴</span>
            <span className="text-white">Urbandom</span>
            <span className="text-purple-200">.com</span>
          </Link>
        </motion.div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center sm:justify-end w-full sm:w-auto">
          {/* Post Property Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handlePostProperty}
            className="bg-white text-[var(--accent)] font-semibold px-4 py-1 rounded-full shadow-sm transition"
          >
            Post Property
          </motion.button>

          {/* Avatar Menu */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-full px-2 py-1 flex items-center gap-2 shadow cursor-pointer"
            style={{ backgroundColor: "#fff", color: "#1f2937" }}
            onClick={onToggleSidebar}
          >
            <FiMenu className="text-xl pointer-events-none" />
            <div
              className="text-sm pointer-events-none"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "9999px",
                background:
                  "linear-gradient(to bottom right, #7e5bef, #5e4eea)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
