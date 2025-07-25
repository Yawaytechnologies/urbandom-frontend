import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FiChevronDown, FiMenu, FiX, FiPlus } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout  } from "../../redux/reducer/userLoginSlice";
import { logoutOwner } from "../../redux/reducer/ownerAuthSlice";

// Portal dropdown as an inline component
function DropdownPortal({ open, anchorRef, children }) {
  if (!open || !anchorRef?.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();
  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        minWidth: rect.width,
        zIndex: 9999,
      }}
      className="bg-white shadow-lg rounded-md py-2 w-48"
    >
      {children}
    </div>,
    document.body
  );
}

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
  const moreBtnRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const tab = new URLSearchParams(location.search).get("tab") || "enquiries";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showMore) return;
    const handleClickOutside = (event) => {
      if (
        moreBtnRef.current &&
        !moreBtnRef.current.contains(event.target) &&
        !document.getElementById("dashboard-more-dropdown")?.contains(event.target)
      ) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  const isActive = (t) => tab === t || (!tab && t === "enquiries");

  const handleMenuClick = (key) => {
    onMenuClick?.(key);
    if (key === "addproperty") {
      navigate("/add-property");
    } else {
      navigate(`/dashboard?tab=${key}`);
    }
    setShowMore(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutOwner());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

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

                <div className="relative">
                  <button
                    ref={moreBtnRef}
                    aria-haspopup="menu"
                    aria-expanded={showMore}
                    onClick={() => setShowMore((prev) => !prev)}
                    className="flex items-center gap-1 hover:text-purple-700 transition-colors"
                  >
                    More
                    <FiChevronDown className={`transition-transform duration-200 ${showMore ? "rotate-180" : ""}`} />
                    <span className="text-red-500">•</span>
                  </button>
                  <DropdownPortal open={showMore} anchorRef={moreBtnRef}>
                    <div id="dashboard-more-dropdown">
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
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </DropdownPortal>
                </div>
              </nav>

              <a
                href="/propertyform"
                className="hidden md:block bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2 rounded-md font-semibold transition"
              >
                + Add Property
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile/Tablet Bottom Navigation */}
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
