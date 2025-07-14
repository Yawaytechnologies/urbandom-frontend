import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiMenu, FiX, FiPlus } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardHeader = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get("tab");

  const handleResize = () => setIsDesktop(window.innerWidth >= 1024);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showMore) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  const isActive = (t) => tab === t;

  return (
    <header className="z-50">
      {/* Desktop Header */}
      {isDesktop && (
        <div className={`sticky top-0 bg-[#dac7ff] transition-shadow duration-300 ${isScrolled ? "shadow-md rounded-b-3xl" : ""}`}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              <div className="flex items-center gap-2 font-bold text-base md:text-lg text-[#131b32]">
                <span className="text-yellow-500 text-xl">▴</span>
                <span>urbandom.com</span>
              </div>

              <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#131b32]">
                {["enquiries", "listings"].map((item) => (
                  <button
                    key={item}
                    onClick={() => onMenuClick(item)}
                    className="hover:text-purple-700 transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}

                <div className="relative" ref={dropdownRef}>
                  <button
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
                        onClick={() => alert("Logging out...")}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </nav>

              <a
                href="/add-property"
                className="hidden md:block bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2 rounded-md font-semibold transition"
              >
                + Add Property
              </a>

              <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Navigation - Mobile/Tablet */}
      {!isDesktop && !mobileMenuOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 pt-2 pb-3 flex justify-around items-center text-gray-700 shadow-lg">
          {/* Items */}
          {[
            { key: "enquiries", icon: <MdOutlineSupportAgent size={16} />, label: "Enquiries" },
            { key: "listings", icon: <HiOutlineHomeModern size={16} />, label: "Listings" },
            { key: "profile", icon: <IoPersonOutline size={16} />, label: "Profile" },
            { key: "addproperty", icon: <FiPlus size={16} />, label: "Post", special: true },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onMenuClick(item.key);
                navigate(`/dashboard?tab=${item.key}`);
              }}
              className="group flex flex-col items-center text-xs"
            >
              <div className={`relative flex items-center justify-center w-10 h-10 transition-all`}>
                <div
                  className={`${
                    item.special
                      ? "bg-purple-200 text-purple-600"
                      : isActive(item.key)
                      ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
                      : "text-gray-700"
                  } group-hover:bg-gradient-to-br from-purple-500 to-indigo-500 group-hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300`}
                >
                  {item.icon}
                </div>
              </div>
              <span className={`mt-1 ${isActive(item.key) ? "text-purple-600" : "group-hover:text-purple-600"} transition-all`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
