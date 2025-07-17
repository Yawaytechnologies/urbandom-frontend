import React, { useState, useEffect } from "react";

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

const DashboardSidebar = ({ activeSection, onSubmenuChange }) => {
  const menus = MENU_STRUCTURE[activeSection] || [];

  const [activeSubmenu, setActiveSubmenu] = useState(menus[0]);
  const [propertyType, setPropertyType] = useState("Residential");
  const [openCategory, setOpenCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

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

  return (
    // Only visible on lg and up (desktop)
    <aside className="hidden lg:block w-72 bg-[#f7f7ff] pt-4 pb-8 px-4 border-r border-gray-200 shadow-inner rounded-tr-2xl max-h-screen overflow-y-auto">
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-purple-700 capitalize">
          {activeSection}
        </h2>

        {activeSection === "listings" && (
          <>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Show
              </h3>
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
                    <span>{cat} ({Math.floor(Math.random() * 4)})</span>
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

        {activeSection === "enquiries" && (
          <ul className="mt-2 space-y-2 text-sm font-medium text-gray-700">
            {menus.map((item) => (
              <li
                key={item}
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
    </aside>
  );
};

export default DashboardSidebar;
