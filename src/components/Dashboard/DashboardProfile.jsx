import { useState, useEffect, useRef } from "react";
import { FiEdit, FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { HiMenuAlt2 } from "react-icons/hi";

const SIDEBAR_ITEMS = [
  { key: "basicProfile", label: "Basic Profile" },
  { key: "contacted", label: "Users You Contacted" },
  { key: "properties", label: "Your Properties" },
];

const PROPERTY_TYPES = [
  "All",
  "Rent",
  "Sale",
  "Commercial-Rent",
  "PG/Hostel",
  "Flatmates",
  "Land/Plot",
];

const DashboardProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "jana",
    phone: "9087410210",
    email: "",
    city: "Chennai",
    image: null,
  });
  const [activeSection, setActiveSection] = useState("basicProfile");

  // State to hold the contacted properties data
  const [contactedProperties, setContactedProperties] = useState([]);
  const [filter, setFilter] = useState("All");

  // State for Your Properties section
  const [properties, setProperties] = useState([]);
  const [contactedData, setContactedData] = useState([]);

  // Load profile from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dashboardProfile");
    if (stored) setProfile(JSON.parse(stored));
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage)
      setProfile((prevState) => ({ ...prevState, image: savedImage }));

    // Dummy property data
    setProperties([
      {
        id: 1,
        title: "3 BHK Apartment",
        location: "Chennai",
        price: "₹35,000/month",
        status: "Active",
      },
      {
        id: 2,
        title: "2 BHK Flat",
        location: "Chennai",
        price: "₹25,000/month",
        status: "Inactive",
      },
    ]);
    // Dummy contacted data
    setContactedData([
      {
        id: 1,
        name: "John Doe",
        propertyType: "Rent",
        location: "Chennai",
        status: "Contacted",
      },
      {
        id: 2,
        name: "Alice Smith",
        propertyType: "PG/Hostel",
        location: "Chennai",
        status: "Contacted",
      },
      {
        id: 3,
        name: "Mike Johnson",
        propertyType: "Sale",
        location: "Chennai",
        status: "Contacted",
      },
      {
        id: 4,
        name: "Sara Lee",
        propertyType: "Commercial-Rent",
        location: "Chennai",
        status: "Contacted",
      },
    ]);
  }, []);

  // Update profile image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, image: url });
      localStorage.setItem("profileImage", url);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!profile.email.trim()) {
      alert("❌ Please enter a valid email.");
      return;
    }
    localStorage.setItem("dashboardProfile", JSON.stringify(profile));
    alert("✅ Profile saved successfully!");
    setIsModalOpen(false);
  };

  // Handle outside click for mobile sidebar
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setSidebarOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile when navigating
    if (section === "contacted") setContactedProperties([]);
  };

  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const filteredContactedData = contactedData.filter((user) => {
    if (filter === "All") return true;
    return user.propertyType === filter;
  });

  // --- SIDEBAR (used both mobile & desktop) ---
  const Sidebar = (
    <aside
      ref={sidebarRef}
      className={`
        flex flex-col bg-white shadow-lg rounded-t-3xl rounded-b-3xl py-6 px-5
        md:rounded-lg md:h-screen md:py-8 md:px-4 md:shadow-md
        w-[85vw] max-w-xs h-full fixed z-40 top-0 left-0
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block md:w-64
      `}
      style={{
        minHeight: 300,
        maxHeight: 520,
      }}
    >
      <div className="flex justify-between items-center mb-6 md:mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Manage your Account
        </h2>
        {/* Mobile close button */}
        <button
          className="md:hidden p-1 text-gray-700"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <IoMdClose size={26} />
        </button>
      </div>
      <ul className="space-y-3 text-sm">
        {SIDEBAR_ITEMS.map((item) => (
          <li
            key={item.key}
            className={`cursor-pointer px-2 py-2 rounded-lg transition ${
              activeSection === item.key
                ? "bg-[#f2eaff] text-[#7D4AEA] font-bold scale-105 shadow"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleSectionChange(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );

  return (
    <div className="flex max-w-6xl mx-auto mt-6 px-2 md:px-4 relative">
      {/* --- MOBILE BOTTOM-LEFT HAMBURGER --- */}
      {/* --- MOBILE BOTTOM-LEFT HAMBURGER (Bounce style) --- */}
      <motion.button
        className="md:hidden fixed bottom-20 left-5 z-50 bg-[#5f36ff] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
        animate={{ y: [0, -11, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.85 }}
      >
        <HiMenuAlt2 size={24} /> 
      </motion.button>

      {/* --- MOBILE SIDEBAR DRAWER + OVERLAY --- */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/30 transition-opacity duration-300
          ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          md:hidden
        `}
        aria-hidden={!sidebarOpen}
      />
      {/* Sidebar (mobile: slide, desktop: static) */}
      {Sidebar}

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 space-y-6 md:pl-6 pt-3 md:pt-0 w-full">
        {/* --- Basic Profile Section --- */}
        {activeSection === "basicProfile" && (
          <>
            <h2 className="font-semibold text-black mb-2">My Profile</h2>
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-start flex-wrap gap-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#7D4AEA]/90 rounded-full flex items-center justify-center overflow-hidden">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      width="30"
                      height="30"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C13.38 2 14.5 3.12 14.5 4.5C14.5 5.88 13.38 7 12 7C10.62 7 9.5 5.88 9.5 4.5C9.5 3.12 10.62 2 12 2ZM12 8.5C14.21 8.5 16 10.29 16 12.5V14H8V12.5C8 10.29 9.79 8.5 12 8.5ZM12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z" />
                    </svg>
                  )}
                </div>
                <div className="text-sm ml-2 mt-2 md:mt-3">
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-gray-700">+91 {profile.phone}</p>
                  <p className="text-gray-800 mt-1">{profile.email}</p>
                  <p className="text-gray-800 mt-1">{profile.city}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#7D4AEA] text-sm font-medium flex items-center gap-1"
              >
                <FiEdit />
                Edit Profile
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                <div className="bg-white w-[95vw] max-w-[420px] rounded-lg py-4 px-6 relative shadow-lg">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
                  >
                    ×
                  </button>
                  <h2 className="text-lg font-semibold text-center mb-3">
                    Edit Your Information
                  </h2>
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full border border-gray-300 bg-gray-100 overflow-hidden flex items-center justify-center">
                      {profile.image ? (
                        <img
                          src={profile.image}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="gray"
                        >
                          <circle cx="12" cy="10" r="3" />
                          <path d="M6 18c1-2 4-4 6-4s5 2 6 4" />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="gray"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                      )}
                    </div>
                    <label className="mt-2 text-sm text-gray-600 cursor-pointer border border-gray-300 px-4 py-1 rounded hover:bg-gray-100 transition">
                      Add Image
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-gray-600 font-semibold mb-1">
                        NAME
                      </label>
                      <input
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 py-1 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-semibold mb-1">
                        EMAIL
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 py-1 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-semibold mb-1">
                        PHONE NUMBER
                      </label>
                      <div className="flex gap-2 items-center">
                        <select className="border-b border-gray-300 py-1 px-2 focus:outline-none text-sm text-gray-700">
                          <option>+91</option>
                        </select>
                        <input
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                          className="w-full border-b border-gray-300 py-1 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="inline-block bg-[#7D4AEA] text-white px-4 py-1.5 rounded-full font-medium text-sm">
                        {profile.city}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-1.5 border rounded text-gray-700 font-medium hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!profile.email.trim()}
                      onClick={handleSave}
                      className={`px-5 py-1.5 rounded font-medium text-white ${
                        profile.email.trim()
                          ? "bg-[#7D4AEA] hover:bg-[#5c39cc]"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Users You Contacted */}
        {activeSection === "contacted" && (
          <>
            <h2 className="font-semibold text-black mb-2">
              Users You Contacted
            </h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`px-4 py-2 rounded-md font-medium text-sm ${
                    filter === type
                      ? "bg-[#7D4AEA] text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {filteredContactedData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContactedData.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-sm font-semibold">{user.name}</h3>
                      <p className="text-gray-700">{user.location}</p>
                      <p className="text-gray-700">{user.propertyType}</p>
                      <p className="text-gray-700">{user.status}</p>
                    </div>
                    <button className="text-[#7D4AEA] text-sm font-semibold">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No users are contacted yet!</p>
            )}
          </>
        )}

        {/* Your Properties */}
        {activeSection === "properties" && (
          <>
            <h2 className="font-semibold text-black mb-2">Your Properties</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`px-4 py-2 rounded-md font-medium text-sm ${
                    filter === type
                      ? "bg-[#7D4AEA] text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">
                        {property.title}
                      </h3>
                      <p className="text-gray-700">{property.location}</p>
                      <p className="text-gray-700">{property.price}</p>
                      <p className="text-gray-700">{property.status}</p>
                    </div>
                    <button className="text-[#7D4AEA] text-sm font-semibold">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No properties found. Want to post a property?</p>
            )}
            <button
              className="mt-4 px-6 py-2 rounded-md bg-[#7D4AEA] text-white font-semibold"
              onClick={() => console.log("Post Property clicked")}
            >
              Post Your Property
            </button>
          </>
        )}

        {/* My Chats */}
        {activeSection === "basicProfile" && (
          <div>
            <h2 className="font-semibold text-black mb-2">My Chats</h2>
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-black mb-1 flex items-center gap-2">
                  Messages
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    3
                  </span>
                </p>
                <a
                  href="#"
                  className="text-[#7D4AEA] text-sm font-semibold hover:underline"
                >
                  View Inbox
                </a>
              </div>
              <img
                src="/assets/chat-illustration.png"
                alt="chat illustration"
                className="w-24 h-20 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProfile;
