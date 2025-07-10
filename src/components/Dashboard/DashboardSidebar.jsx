import React, { useState, useEffect } from "react";

const MENU_STRUCTURE = {
  enquiries: ["All Enquiries", "Contacted", "Matching Tenants", "Buy"],  // Added "Buy" in enquiries
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
  };

  // Handle Property Type Change
  useEffect(() => {
    if (propertyType === "Commercial") {
      setSubCategories(["Buy", "Lease"]);  // Commercial properties include Buy and Lease
    } else {
      setSubCategories(["Buy", "Rent", "PG"]);  // Residential properties also include Buy
    }
  }, [propertyType]);

  return (
    <aside className="w-full h-screen md:w-64 bg-[#f7f7ff] pt-6 shadow-inner border-r border-gray-200 rounded-tr-2xl flex-shrink-0">
      <div className="px-4 pt-4">
        {/* === Listings Sidebar === */}
        {activeSection === "listings" && (
          <>
            <h2 className="text-base font-semibold text-purple-700 mb-4 capitalize">
              {activeSection}
            </h2>

            {/* Property Type */}
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Show</h3>

            <div className="mb-4 space-y-2">
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
                    {type} Properties
                  </span>
                </label>
              ))}
            </div>

            {/* Sub-Category Expandable */}
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Sub-Category
            </h3>
            {subCategories.map((cat) => (
              <div key={cat}>
                <div
                  onClick={() => handleCategoryToggle(cat)}
                  className={`flex justify-between items-center px-4 py-2 cursor-pointer text-sm font-semibold rounded ${
                    openCategory === cat
                      ? "bg-[#e6deff] text-[#5f36ff]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>
                    {cat} ({Math.floor(Math.random() * 4)})
                  </span>
                  <span className="text-lg font-bold">
                    {openCategory === cat ? "⌄" : "›"}
                  </span>
                </div>

                {openCategory === cat && (
                  <ul className="ml-6 mt-1 space-y-1 text-sm font-medium text-gray-700">
                    {menus.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => setActiveSubmenu(item)}
                        className={`px-2 py-1 rounded cursor-pointer ${
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
            ))}
          </>
        )}

        {/* === Enquiries Sidebar === */}
        {activeSection === "enquiries" && (
          <>
            <h2 className="text-base font-semibold text-purple-700 mb-4 capitalize">
              {activeSection}
            </h2>
            <ul className="space-y-2 text-sm font-medium text-gray-700">
              {menus.map((item, idx) => {
                const isActive = activeSubmenu === item;
                return (
                  <li
                    key={idx}
                    onClick={() => setActiveSubmenu(item)}
                    className={`flex items-center px-4 py-2 rounded-l-md cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#e6deff] text-[#5f36ff] font-semibold border-l-4 border-[#5f36ff]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item} (0)
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
