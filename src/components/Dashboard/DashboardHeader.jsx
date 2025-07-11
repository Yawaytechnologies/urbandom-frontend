import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const DashboardHeader = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        showMore
      ) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#dac7ff] transition-shadow duration-300 ${
        isScrolled ? "shadow-md rounded-b-3xl" : ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-base md:text-lg text-[#131b32]">
            <span className="text-yellow-500 text-xl">▴</span>
            <span>urbandom.com</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#131b32]">
            <button
              onClick={() => onMenuClick("enquiries")}
              className="hover:text-purple-700 transition-colors"
            >
              Enquiries
            </button>
            <button
              onClick={() => onMenuClick("listings")}
              className="hover:text-purple-700 transition-colors"
            >
              Listings
            </button>

            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="flex items-center gap-1 hover:text-purple-700 transition-colors"
              >
                More
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    showMore ? "rotate-180" : ""
                  }`}
                />
                <span className="text-red-500">•</span>
              </button>

              {showMore && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <button
                    onClick={() => {
                      onMenuClick("profile");
                      setShowMore(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert("This site is currently unavailable.");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Go to Urbandom.com
                  </button>
                  <button
                    onClick={() => {
                      alert("Logging out...");
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Add Property Button */}
          <a
            href="/add-property"
            className="hidden md:block bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2 rounded-md font-semibold transition"
          >
            + Add Property
          </a>

          {/* Hamburger Menu - Mobile Only */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 text-sm font-medium text-[#131b32]">
            <button
              onClick={() => {
                onMenuClick("enquiries");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md"
            >
              Enquiries
            </button>
            <button
              onClick={() => {
                onMenuClick("listings");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md"
            >
              Listings
            </button>

            {/* Mobile More Dropdown */}
            <div ref={dropdownRef}>
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md"
              >
                <span>More</span>
                <FiChevronDown
                  className={`transition-transform ${
                    showMore ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMore && (
                <div className="mt-1 space-y-1 px-2">
                  <button
                    onClick={() => {
                      onMenuClick("profile");
                      setShowMore(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert("This site is currently unavailable.");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    Go to Urbandom.com
                  </button>
                  <button
                    onClick={() => {
                      alert("Logging out...");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Add Property Button */}
            <a
              href="/add-property"
              className="block bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2 rounded-md font-semibold text-center transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              + Add Property
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
