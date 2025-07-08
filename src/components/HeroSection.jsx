import React, { useState } from 'react';
import { FaHome, FaBuilding, FaUsers } from 'react-icons/fa';

const HeroSection = () => {
  const [tab, setTab] = useState('buy');

  const tabs = [
    { label: 'buy', icon: <FaHome /> },
    { label: 'rent', icon: <FaBuilding /> },
    { label: 'co-living/pg', icon: <FaUsers /> },
  ];

  return (
    <section
      className="relative text-white pt-32 pb-20 px-4 md:px-6 min-h-[90vh] bg-no-repeat bg-center bg-cover select-none"
      style={{
        backgroundImage: `linear-gradient(rgba(19, 27, 50, 0.4), rgba(19, 27, 50, 0.4)), url('/LandingPageImage.jpg')`,
      }}
    >
      <div className="max-w-6xl mx-auto text-center px-2">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Properties to{' '}
          <span className="text-yellow-400 capitalize">{tab}</span> in Chennai
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-10 text-white/90">
          <span className="font-bold text-white">6K+</span> listings added daily and{' '}
          <span className="font-bold text-white">68K+</span> total verified
        </p>

        {/* Floating Box */}
        <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-6 shadow-xl w-full max-w-4xl mx-auto space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {tabs.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setTab(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow transition-all duration-200 border ${
                  tab === label
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent'
                    : 'bg-white/70 text-gray-800 hover:bg-white border-gray-300'
                }`}
              >
                {icon}
                <span className="capitalize">{label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="bg-white/80 rounded-full flex flex-col sm:flex-row items-center px-4 py-2 gap-3 shadow-inner backdrop-blur-sm">
            <input
              type="text"
              placeholder="Search for locality, landmark, project, or builder"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 text-sm sm:text-base"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
