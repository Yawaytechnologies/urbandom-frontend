import React, { useState, useEffect } from "react";

const MENU_STRUCTURE = {
  enquiries: ["All", "Contacted", "Matching Tenants"], // removed Buy
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

const DashboardSidebar = ({ activeSection, onSubmenuChange }) => {
  const menus = MENU_STRUCTURE[activeSection] || [];

  const [activeSubmenu, setActiveSubmenu] = useState(menus[0]);
  const [propertyType, setPropertyType] = useState("Residential");
  const [openCategory, setOpenCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveSubmenu(menus[0]);
    setOpenCategory("");
  }, [activeSection]);

  useEffect(() => {
    if (onSubmenuChange) {
      onSubmenuChange(activeSubmenu);
    }
  }, [activeSubmenu, onSubmenuChange]);

  useEffect(() => {
    if (propertyType === "Commercial") {
      setSubCategories(["Buy", "Lease"]);
    } else {
      setSubCategories(["Buy", "Rent", "PG"]);
    }
  }, [propertyType]);

  const handleCategoryToggle = (category) => {
    setOpenCategory((prev) => (prev === category ? "" : category));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Enquiry Tabs: Only visible for enquiries, no white box */}
      {activeSection === "enquiries" && (
        <div className="block sm:hidden w-full overflow-x-auto border-b border-gray-200 z-10 bg-transparent">
          <div className="flex gap-3 w-max px-2 py-3 bg-transparent">
            {menus.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSubmenu(item)}
                className={`whitespace-nowrap px-4 py-2 text-sm rounded-full cursor-pointer border transition-all flex items-center gap-2 ${
                  activeSubmenu === item
                    ? "bg-[#e6deff] border-[#5f36ff] text-[#5f36ff] font-semibold"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                <span>{item}</span>
                <span
                  className={`ml-1 text-xs px-2 py-1 rounded-full ${
                    activeSubmenu === item
                      ? "bg-white text-[#5f36ff]"
                      : "bg-[#f2f2ff] text-purple-700"
                  }`}
                >
                  0
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Sidebar (hidden on mobile unless toggled) */}
      <aside
        className={`w-full sm:w-72 md:w-64 lg:w-64 bg-[#f7f7ff] pt-4 pb-8 px-3 sm:px-4 border-r border-gray-200 shadow-inner rounded-tr-2xl flex-shrink-0 max-h-screen overflow-y-auto transition-all ${
          isSidebarOpen ? "block" : "hidden"
        } sm:block`}
      >
        <div className="space-y-4">
          {/* Section Header */}
          <h2 className="text-base font-semibold text-purple-700 capitalize">
            {activeSection}
          </h2>

          {/* Listings Section */}
          {activeSection === "listings" && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Show
                </h3>
                <div className="flex gap-2 sm:flex-col flex-wrap">
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
                      className={`w-full flex justify-between items-center px-4 py-2 text-sm font-semibold rounded ${
                        openCategory === cat
                          ? "bg-[#e6deff] text-[#5f36ff]"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      aria-expanded={openCategory === cat}
                      aria-controls={`${cat}-submenu`}
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
                        id={`${cat}-submenu`}
                        className="mt-1 ml-4 space-y-1 text-sm font-medium"
                      >
                        {menus.map((item, idx) => (
                          <li
                            key={idx}
                            onClick={() => setActiveSubmenu(item)}
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

          {/* Enquiries Section (Desktop sidebar only) */}
          {activeSection === "enquiries" && (
            <ul className="hidden sm:block mt-2 space-y-2 text-sm font-medium text-gray-700">
              {menus.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => setActiveSubmenu(item)}
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

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="sm:hidden fixed bottom-4 right-4 p-3 bg-purple-600 text-white rounded-full z-50"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
