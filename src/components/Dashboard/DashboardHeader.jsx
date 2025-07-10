import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const DashboardHeader = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside dropdown
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
      className={`sticky top-0 z-50 bg-[#dac7ff] h-20 transition-shadow duration-300 ${
        isScrolled ? "shadow-md rounded-b-3xl" : ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-base md:text-lg text-text-secondary">
            <span className="text-yellow-500 text-xl">▴</span>
            <span>urbandom.com</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12 text-sm font-medium text-[#131b32]">
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
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <button
                    onClick={() => {
                      onMenuClick("profile");
                      setShowMore(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  <a
                    href="https://urbandom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "This site is currently unavailable. Please check back later."
                      );
                    }}
                  >
                    Go to Urbandom.com
                  </a>

                  <button
                    onClick={() => alert("Logging out...")}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Add Property Button */}
          <a
            href="/add-property"
            className="hidden md:block bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2 rounded-md font-semibold transition"
          >
            + Add Property
          </a>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md"
              >
                <span>More</span>
                <FiChevronDown
                  className={`text-sm transition-transform ${showMore ? "rotate-180" : ""}`}
                />
              </button>
              {showMore && (
                <div className="bg-white shadow-md rounded-md py-2 mt-1 w-full">
                  <button
                    onClick={() => {
                      onMenuClick("profile");
                      setShowMore(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "This site is currently unavailable. Please check back later."
                      );
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Go to Urbandom.com
                  </button>
                  <button
                    onClick={() => {
                      alert("Logging out...");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
