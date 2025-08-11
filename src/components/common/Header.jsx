import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHouseKeys } from "react-icons/gi";
import { LiaUserCircleSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import AuthModal from "../../pages/AuthPage";

function Header({ onToggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // key wobble
  const [shake, setShake] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // overlay color
  const { pathname } = useLocation();
  const tab = pathname.includes("/rent") ? "rent" : pathname.includes("/pg") ? "pg" : "buy";
  const overlayAtTop = `bg-gradient-to-b ${
    { buy: "from-black/50 to-black/25", rent: "from-black/50 to-black/25", pg: "from-black/50 to-black/25" }[tab]
  }`;

  const { user } = useSelector((s) => s.userAuth || {});
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only Post Property opens auth
  const handlePostProperty = () => {
    if (user && user.id) navigate("/dashboard");
    else setShowAuth(true);
  };

  const handleMenuToggle = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    onToggleSidebar?.(next);
  };

  const keyIconStyle = {
    background: "linear-gradient(120deg, #ffa726 30%, #ffe259 80%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    verticalAlign: "middle",
    filter: "drop-shadow(0 2px 8px #21212160)",
  };

  const avatarStyle = {
    color: "white",
    background: "linear-gradient(to bottom right, #7e5bef, #5e4eea)",
    borderRadius: "50%",
  };

  /* ===================== Buttons ===================== */

  // Desktop button with floating NEW badge
  const PostPropertyButton = () => (
    <div className="relative hidden sm:inline-block">
      <span
        className="
          absolute -top-2 -right-2
          bg-[#F5C518] text-black text-[10px] font-bold
          px-2 py-[1px] rounded-full shadow
        "
      >
        NEW
      </span>
      <button
        onClick={handlePostProperty}
        className="
          inline-flex items-center
          bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500
          hover:from-purple-800 hover:via-purple-700 hover:to-purple-600
          text-white font-semibold py-2 px-5 rounded-xl
          transition duration-300 ease-in-out
          shadow-md shadow-purple-400/40
          whitespace-nowrap
        "
      >
        Post Property
      </button>
    </div>
  );

  // Smaller mobile button with floating NEW badge
  const PostPropertyButtonMobile = () => (
    <div className="relative inline-block sm:hidden">
      <span
        className="
          absolute -top-1 -right-1
          bg-[#F5C518] text-black text-[9px] font-bold
          px-1.5 py-[1px] rounded-full shadow
        "
      >
        NEW
      </span>
      <button
        onClick={handlePostProperty}
        className="
          inline-flex items-center justify-center
          bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500
          hover:from-purple-800 hover:via-purple-700 hover:to-purple-600
          text-white font-semibold text-xs leading-none
          py-1 px-2 rounded-md shadow-md shadow-purple-400/40
          whitespace-nowrap
        "
        aria-label="Post Property"
      >
        Post Property
      </button>
    </div>
  );

  // Desktop-only burger (user icon is NOT a toggle on desktop)
  const BurgerMenu = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden sm:flex w-6 h-5 flex-col justify-between items-center bg-white/90 shadow rounded-full p-1"
      aria-label="Toggle menu"
    >
      <span className="block w-full h-[2px] bg-black rounded"></span>
      <span className="block w-full h-[2px] bg-black rounded"></span>
      <span className="block w-full h-[2px] bg-black rounded"></span>
    </button>
  );

  /* ===================== Render ===================== */

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-b from-[#1a1f3b] via-[#2a2f5e] to-[#3a3f7a] shadow-lg border-b border-blue-100/20"
            : overlayAtTop
        }`}
      >
        {/* MOBILE */}
        <div className="sm:hidden flex items-center justify-between gap-2 px-3 py-2">
          {/* Logo (two lines) */}
          <div className="flex items-center min-w-0">
            <Link
              to="/"
              className="flex items-center text-white relative"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.18)" }}
            >
              <span className="relative flex items-end mr-1 shrink-0">
                <GiHouseKeys style={keyIconStyle} size={16} className={shake ? "key-shake" : ""} />
                <span className="key-fade-shadow" style={{ bottom: -3 }}>
                  <span className="key-fade-mobile"></span>
                </span>
              </span>
              <span className="leading-3">
                <span className="block text-[10px] font-semibold tracking-[0.14em]">URBANDOM</span>
                <span className="block text-[9px] tracking-[0.12em]">
                  <span className="bg-[#F5C518] text-black font-semibold px-1 rounded-sm">REAL</span>&nbsp;ESTATE
                </span>
              </span>
            </Link>
          </div>

          {/* Right controls: tiny Post + USER ICON AS TOGGLE */}
          <div className="flex items-center gap-2 shrink-0">
            <PostPropertyButtonMobile />
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-label="Open menu"
              className="grid place-items-center w-8 h-8 rounded-full"
              style={avatarStyle}
              title="Menu"
            >
              <LiaUserCircleSolid size={18} />
            </button>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center ml-8">
            <Link
              to="/"
              className="flex items-center font-semibold text-[15px] sm:text-[16px] tracking-[0.14em] uppercase text-white relative"
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.18)" }}
            >
              <span className="relative flex items-end">
                <GiHouseKeys style={keyIconStyle} size={40} className={shake ? "key-shake" : ""} />
                <span className="key-fade-shadow" style={{ bottom: -4 }}>
                  <span className="key-fade-desktop"></span>
                </span>
              </span>
              <span className="relative top-[2px] ml-2">
                URBANDOM
                <br />
                <span className="bg-[#F5C518] text-black font-semibold px-1 rounded-sm">REAL</span> ESTATE
              </span>
            </Link>
          </div>

          {/* Right: burger toggles sidebar; avatar is just an icon (NO LOGIN MODAL) */}
          <div className="flex items-center gap-6 text-sm mr-8">
            <PostPropertyButton />
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white text-gray-800 shadow">
              <BurgerMenu onClick={handleMenuToggle} />
              <div
                className="grid place-items-center w-8 h-8 rounded-full"
                style={avatarStyle}
                title="Account"
                aria-label="Account"
              >
                <LiaUserCircleSolid size={18} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default Header;
