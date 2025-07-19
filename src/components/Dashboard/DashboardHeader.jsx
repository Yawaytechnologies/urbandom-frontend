// DashboardHeader.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiMenu, FiX, FiPlus } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const DASHBOARD_TABS = [
  { key: "enquiries", icon: <MdOutlineSupportAgent size={18} />, label: "Enquiries" },
  { key: "listings", icon: <HiOutlineHomeModern size={18} />, label: "Listings" },
  { key: "addproperty", icon: <FiPlus size={20} />, label: "Post", special: true },
  { key: "profile", icon: <IoPersonOutline size={18} />, label: "Profile" }
];

const DashboardHeader = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get("tab") || "enquiries";

  // Detect desktop/mobile on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll shadow for desktop
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };
    if (showMore) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  // Helper for active state
  const isActive = (t) => tab === t || (!tab && t === "enquiries");

  // Handlers
  const handleMenuClick = (key) => {
    onMenuClick?.(key);
    if (key === "addproperty") {
      navigate("/add-property");
    } else {
      navigate(`/dashboard?tab=${key}`);
    }
    setShowMore(false);
  };

  return (
    <header className="z-50">
      {/* Desktop Header */}
      {isDesktop && (
        <div className={`sticky top-0 bg-[#dac7ff] transition-shadow duration-300 ${isScrolled ? "shadow-md rounded-b-3xl" : ""}`}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <div className="flex items-center gap-2 font-bold text-base md:text-lg text-[#131b32]">
                <span className="text-yellow-500 text-xl">▴</span>
                <span>urbandom.com</span>
              </div>
              {/* Main Nav */}
              <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#131b32]">
                <button
                  onClick={() => handleMenuClick("enquiries")}
                  className={`hover:text-purple-700 transition-colors ${isActive("enquiries") ? "text-purple-700 font-semibold" : ""}`}
                >
                  Enquiries
                </button>
                <button
                  onClick={() => handleMenuClick("listings")}
                  className={`hover:text-purple-700 transition-colors ${isActive("listings") ? "text-purple-700 font-semibold" : ""}`}
                >
                  Listings
                </button>
                {/* More Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    aria-haspopup="menu"
                    aria-expanded={showMore}
                    onClick={() => setShowMore((prev) => !prev)}
                    className="flex items-center gap-1 hover:text-purple-700 transition-colors"
                  >
                    More
                    <FiChevronDown className={`transition-transform duration-200 ${showMore ? "rotate-180" : ""}`} />
                    <span className="text-red-500">•</span>
                  </button>
                  {showMore && (
                    <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                      <button
                        onClick={() => handleMenuClick("profile")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => window.open("https://urbandom.com", "_blank")}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Go to Urbandom.com
                      </button>
                      <button
                        onClick={() => alert("Logging out...")}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </nav>
              {/* Add Property CTA */}
              <a
                href="/add-property"
                className="hidden md:block bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2 rounded-md font-semibold transition"
              >
                + Add Property
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Navigation - Mobile/Tablet */}
      {!isDesktop && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center text-gray-700 shadow-[0_0_16px_2px_rgba(160,145,235,0.08)]">
          {DASHBOARD_TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleMenuClick(item.key)}
              className={`group flex flex-col items-center justify-center text-xs font-medium focus:outline-none`}
              aria-current={isActive(item.key) ? "page" : undefined}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 
                ${item.special
                    ? "bg-purple-100 text-purple-600 border-2 border-white -mt-3 shadow-lg"
                    : isActive(item.key)
                    ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
                    : "text-gray-700"
                } group-hover:bg-gradient-to-br from-purple-500 to-indigo-500 group-hover:text-white`}
              >
                {item.icon}
              </div>
              <span
                className={`mt-1 transition-colors duration-150 ${isActive(item.key) ? "text-purple-600" : "group-hover:text-purple-600"}`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default DashboardHeader;
