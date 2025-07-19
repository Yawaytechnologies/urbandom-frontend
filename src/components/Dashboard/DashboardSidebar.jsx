// DashboardSidebar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

// Sidebar menu structure
const MENU_STRUCTURE = {
  enquiries: ["All", "Contacted", "Matching Tenants"],
  listings: [
    "All",
    "Active",
    "Expired",
    "Under Review",
    "Rejected",
    "Deleted",
    "Expiring Soon",
  ],
};

function SidebarContent({
  activeSection,
  menus,
  subCategories,
  propertyType,
  setPropertyType,
  openCategory,
  setOpenCategory,
  activeSubmenu,
  setActiveSubmenu,
  handleCategoryToggle,
  closeMobile,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-purple-700 capitalize">
        {activeSection}
      </h2>
      {activeSection === "listings" && (
        <>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Show</h3>
            <div className="flex flex-col gap-2">
              {["Residential", "Commercial"].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="propertyType"
                    checked={propertyType === type}
                    onChange={() => setPropertyType(type)}
                    className="accent-purple-600"
                  />
                  <span
                    className={`text-sm ${
                      propertyType === type
                        ? "text-purple-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Sub-Category
            </h3>
            {subCategories.map((cat) => (
              <div key={cat} className="rounded-md">
                <button
                  onClick={() => handleCategoryToggle(cat)}
                  className={`w-full flex justify-between items-center px-4 py-2 text-sm font-semibold rounded transition ${
                    openCategory === cat
                      ? "bg-[#e6deff] text-[#5f36ff]"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  aria-expanded={openCategory === cat}
                  aria-controls={`submenu-${cat}`}
                >
                  <span>
                    {cat} ({Math.floor(Math.random() * 4)})
                  </span>
                  <span className="font-bold">
                    {openCategory === cat ? "⌄" : "›"}
                  </span>
                </button>
                {openCategory === cat && (
                  <ul
                    id={`submenu-${cat}`}
                    className="mt-1 ml-4 space-y-1 text-sm font-medium"
                  >
                    {menus.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          setActiveSubmenu(item);
                          if (closeMobile) closeMobile();
                        }}
                        className={`px-2 py-1 rounded cursor-pointer transition-all ${
                          activeSubmenu === item
                            ? "bg-[#e6deff] text-[#5f36ff] font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item} (0)
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {activeSection === "enquiries" && (
        <ul className="mt-2 space-y-2 text-sm font-medium text-gray-700">
          {menus.map((item) => (
            <li
              key={item}
              onClick={() => {
                setActiveSubmenu(item);
                if (closeMobile) closeMobile();
              }}
              className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition-all ${
                activeSubmenu === item
                  ? "bg-[#e6deff] text-[#5f36ff] font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {item} (0)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const DashboardSidebar = ({ activeSection = "enquiries", onSubmenuChange }) => {
  const menus = MENU_STRUCTURE[activeSection] || [];

  const [activeSubmenu, setActiveSubmenu] = useState(menus[0]);
  const [propertyType, setPropertyType] = useState("Residential");
  const [openCategory, setOpenCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Subcategories depend on property type
  useEffect(() => {
    if (propertyType === "Commercial") {
      setSubCategories(["Buy", "Lease"]);
    } else {
      setSubCategories(["Buy", "Rent", "PG"]);
    }
  }, [propertyType]);

  useEffect(() => {
    setActiveSubmenu(menus[0]);
    setOpenCategory("");
  }, [activeSection]);

  useEffect(() => {
    if (onSubmenuChange) {
      onSubmenuChange(activeSubmenu);
    }
  }, [activeSubmenu, onSubmenuChange]);

  const handleCategoryToggle = (category) => {
    setOpenCategory((prev) => (prev === category ? "" : category));
    setActiveSubmenu(menus[0]);
  };

  // Animation for sidebar slide-in from left top-to-bottom (mobile)
  const bounceSlide = {
    hidden: { x: "-100%", y: 0, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 18,
        mass: 0.7,
        duration: 0.85,
      },
    },
    exit: {
      x: "-100%",
      y: 0,
      opacity: 0,
      transition: { duration: 0.45, ease: "easeIn" },
    },
  };

  // Hamburger with smooth slow bounce (bottom-left, mobile/tab only)
  return (
    <>
      <motion.button
        className="lg:hidden fixed bottom-20 left-5 z-40 bg-[#5f36ff] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition"
        onClick={() => setShowMobileSidebar(true)}
        aria-label="Open menu"
        animate={{ y: [0, -7, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "easeInOut"
        }}
        whileTap={{ scale: 0.85 }}
      >
        <HiMenuAlt2 size={20} />
      </motion.button>

      {/* MOBILE/TABLET SIDEBAR OVERLAY */}
      <AnimatePresence>
        {showMobileSidebar && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileSidebar(false)}
          >
            {/* SIDEBAR itself */}
            <motion.aside
              className="absolute left-0 top-0 h-full w-[88vw] max-w-xs bg-[#f7f7ff] rounded-tr-2xl rounded-br-2xl p-5 pb-12 shadow-xl overflow-y-auto"
              variants={bounceSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close btn */}
              <button
                className="absolute right-3 top-3 bg-gray-100 rounded-full p-2 text-xl text-gray-600 hover:bg-gray-200"
                onClick={() => setShowMobileSidebar(false)}
                aria-label="Close menu"
              >
                <IoMdClose />
              </button>
              <SidebarContent
                activeSection={activeSection}
                menus={menus}
                subCategories={subCategories}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
                activeSubmenu={activeSubmenu}
                setActiveSubmenu={setActiveSubmenu}
                handleCategoryToggle={handleCategoryToggle}
                closeMobile={() => setShowMobileSidebar(false)}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-72 bg-[#f7f7ff] pt-4 pb-8 px-4 border-r border-gray-200 shadow-inner rounded-tr-2xl max-h-screen overflow-y-auto">
        <SidebarContent
          activeSection={activeSection}
          menus={menus}
          subCategories={subCategories}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          activeSubmenu={activeSubmenu}
          setActiveSubmenu={setActiveSubmenu}
          handleCategoryToggle={handleCategoryToggle}
        />
      </aside>
    </>
  );
};

export default DashboardSidebar;
