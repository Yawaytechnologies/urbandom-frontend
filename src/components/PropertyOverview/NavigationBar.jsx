import React from 'react';

const tabs = [
  'Overview/Home',
  'Highlights',
  'Around This Project',
  'More About Project',
  'About Project',
  'Floor Plan',
  'Tour This Project'
];

export default function NavigationBar() {
  return (
    <div className="w-full bg-white shadow-sm overflow-x-auto">
      <div className="flex space-x-6 px-4 sm:px-6 md:px-8 lg:px-10 py-3 whitespace-nowrap text-sm sm:text-base font-medium border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`relative pb-2 text-gray-600 hover:text-indigo-600 transition-all duration-200 ${
              index === 0 ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
