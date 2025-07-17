import React from 'react';
import { FaEnvelope, FaEye, FaHeart, FaHistory } from 'react-icons/fa';

const tabs = [
  { key: 'contacted', label: 'Contacted Properties', icon: <FaEnvelope /> },
  { key: 'seen', label: 'Seen Properties', icon: <FaEye /> },
  { key: 'saved', label: 'Saved Properties', icon: <FaHeart /> },
  { key: 'recent', label: 'Recent Properties', icon: <FaHistory /> },
];

const ActivityTabs = ({ active, setActive }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-nowrap md:flex-wrap gap-3 sm:gap-4 w-max md:w-full pb-2">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap 
                text-sm md:text-base
                ${isActive
                ? 'bg-purple-100 border-purple-500 text-purple-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}
              `}
              style={{ minWidth: '150px' }} // or use Tailwind: min-w-[150px] md:min-w-fit
            >
              <span>{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
              <span
                className={`ml-auto text-xs font-bold rounded-full px-2 py-0.5 ${
                  isActive ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                00
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTabs;
