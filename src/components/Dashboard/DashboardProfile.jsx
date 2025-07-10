import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const DashboardProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [filter, setFilter] = useState("All"); // This state will track the selected filter for "Users You Contacted"

  // State for Your Properties section
  const [properties, setProperties] = useState([]); // State to hold the user's properties
  const [contactedData, setContactedData] = useState([]); // State for the "Users You Contacted" section

  // Load profile from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dashboardProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }

    // Load image from localStorage if available
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfile((prevState) => ({ ...prevState, image: savedImage }));
    }

    // Fetch properties (You can replace this with an API call to get actual data)
    const fetchedProperties = [
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
    ];
    setProperties(fetchedProperties);

    // Dummy data for contacted users
    const fetchedContactedData = [
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
        propertyType: "PG",
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
    ];
    setContactedData(fetchedContactedData);
  }, []);

  // Update profile image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, image: url });

      // Save image to localStorage
      localStorage.setItem("profileImage", url);
    }
  };

  // Handle profile changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle saving the profile
  const handleSave = () => {
    if (!profile.email.trim()) {
      alert("❌ Please enter a valid email.");
      return;
    }
    localStorage.setItem("dashboardProfile", JSON.stringify(profile));
    alert("✅ Profile saved successfully!");
    setIsModalOpen(false);
  };

  // Change the active section and set the contacted properties when "Users You Contacted" is selected
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "contacted") {
      setContactedProperties([]); // Leave empty if no properties are available
    }
  };

  // Handle filter change for contacted users
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter the contacted users based on the selected category
  const filteredContactedData = contactedData.filter((user) => {
    if (filter === "All") return true;
    return user.propertyType === filter;
  });

  return (
    <div className="flex max-w-6xl mx-auto mt-6 px-4 md:px-">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md rounded-lg p-4 mr-6 h-screen hidden md:block">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Manage your Account
        </h2>
        <ul className="space-y-3 text-sm">
          <li
            className={`cursor-pointer ${
              activeSection === "basicProfile"
                ? "text-[#7D4AEA]"
                : "text-gray-700"
            } font-semibold`}
            onClick={() => handleSectionChange("basicProfile")}
          >
            Basic Profile
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "contacted" ? "text-[#7D4AEA]" : "text-gray-700"
            }`}
            onClick={() => handleSectionChange("contacted")}
          >
            Users You Contacted
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "properties"
                ? "text-[#7D4AEA]"
                : "text-gray-700"
            }`}
            onClick={() => handleSectionChange("properties")}
          >
            Your Properties
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Render Basic Profile Section */}
        {activeSection === "basicProfile" && (
          <>
            <h2 className="font-semibold text-black mb-2">My Profile</h2>

            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-start flex-wrap gap-4">
              <div className="flex gap-3">
                <div className="w-24 h-24 bg-[#7D4AEA]/90 rounded-full flex items-center justify-center overflow-hidden">
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
                <div className="text-sm ml-2 mt-3">
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
                <div className="bg-white w-[420px] rounded-lg py-4 px-6 relative shadow-lg">
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

                  {/* Form */}
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

            {/* Filter Section */}
            <div className="flex gap-4 mb-4">
              {[
                "All",
                "Rent",
                "Sale",
                "Commercial-Rent",
                "PG/Hostel",
                "Flatmates",
                "Land/Plot",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`px-4 py-2 rounded-md font-medium text-sm ${
                    filter === type
                      ? "bg-[#7D4AEA] text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Contacted Properties List */}
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

            {/* Filter Section */}
            <div className="flex gap-4 mb-4">
              {[
                "All",
                "Rent",
                "Sale",
                "Commercial-Rent",
                "PG/Hostel",
                "Flatmates",
                "Land/Plot",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`px-4 py-2 rounded-md font-medium text-sm ${
                    filter === type
                      ? "bg-[#7D4AEA] text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Properties List */}
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

            {/* Post Property Button */}
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
