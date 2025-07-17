import React, { useState, useEffect } from 'react';
import { FaHome, FaBuilding, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ tabType = 'buy' }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabType);
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  // Background images per tab
  const bgImages = {
    buy: '/buyCover.jpeg',
    rent: '/Rent.jpeg',
    pg: '/pgCover.jpg',
  };

  // Accent colors per tab
  const accentColors = {
    buy: '#ff4f81',
    rent: '#00bbff',
    pg: '#ff8800',
  };

  // Location options per tab
  const locationsByTab = {
    buy: ['Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai'],
    rent: ['HSR Layout', 'Koramangala', 'Whitefield', 'JP Nagar'],
    pg: ['Indiranagar', 'BTM Layout', 'Marathahalli', 'Domlur'],
  };

  // Navigation tabs
  const tabs = [
    { label: 'Buy', icon: <FaHome />, route: '/buy' },
    { label: 'Rent', icon: <FaBuilding />, route: '/rent' },
    { label: 'PG/Co-Living', icon: <FaUsers />, route: '/pg' },
  ];

  useEffect(() => {
    setTab(tabType);
    setLocation(locationsByTab[tabType]?.[0] || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabType]);


  const handleTabClick = (label, route) => {
    setTab(label.toLowerCase());
    navigate(route);
  };

  const handleSearch = () => {
    navigate(`/search?type=${tab}&location=${location}&query=${query}`);
  };

  return (
    <section
      className="relative pt-32 pb-20 px-4 sm:px-6 min-h-[80vh] bg-no-repeat bg-center bg-cover select-none"
      style={{
        color: 'var(--text-primary)',
        backgroundImage: `linear-gradient(rgba(19, 27, 50, 0.6), rgba(19, 27, 50, 0.6)), url('${bgImages[tab]}')`,
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
  

  {tab === "pg" && (
    <>
      Best PGs & Hostels Available in{' '}
      <span style={{ color: accentColors[tab] }}>{location}</span>
    </>
  )}

  {!["pg"].includes(tab) && (
    <>
      Properties to <span className="capitalize">{tab}</span> in{' '}
      <span style={{ color: accentColors[tab] }}>{location}</span>
    </>
  )}
</h1>

        <p className="text-base sm:text-lg md:text-xl mb-10 text-white">
          <span className="font-bold">8K+</span> listings added daily and{' '}
          <span className="font-bold">67K+</span> total verified
        </p>

        {/* Tabs */}
        <div className="rounded-2xl p-4 sm:p-6 shadow-2xl w-full max-w-4xl mx-auto space-y-6 bg-black bg-opacity-40 backdrop-blur-md">
          <div className="flex overflow-x-auto justify-start sm:justify-center gap-4 px-2 pb-1 sm:pb-0">
            {tabs.map(({ label, icon, route }) => (
              <button
                key={label}
                onClick={() => handleTabClick(label, route)}
                className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition-all ${
                  tab === label.toLowerCase()
                    ? 'text-white border-white'
                    : 'text-gray-300 border-transparent hover:text-white'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-3xl px-4 py-5 shadow-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3 w-full sm:px-6 sm:py-3">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 rounded-full text-sm sm:text-base bg-white border border-gray-300 text-gray-700 w-full sm:w-auto outline-none"
            >
              {locationsByTab[tab].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for locality, landmark, project, or builder"
              className="flex-1 px-4 py-2 text-sm sm:text-base text-gray-700 rounded-full border border-gray-300 w-full outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-full text-sm w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
