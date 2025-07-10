import React from 'react';
import { useSearchParams } from 'react-router-dom';

const tabs = [
  { key: 'contacted', label: 'Contacted Properties' },
  { key: 'seen', label: 'Seen Properties' },
  { key: 'saved', label: 'Saved Properties' },
  { key: 'recent', label: 'Recent Searches' },
];

const ActivityTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'contacted';

  const handleTabClick = (key) => {
    setSearchParams({ type: key });
  };

  return (
    <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 mb-4 animate-fadeIn">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleTabClick(key)}
          className={`flex items-center justify-between px-4 py-2 rounded-full border w-full sm:w-auto min-w-[180px]
            transition-all duration-300 transform hover:scale-105 ${
              type === key
                ? 'bg-purple-100 border-purple-600 text-purple-700 font-semibold shadow-sm'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
        >
          <span>{label}</span>
          <span className="ml-2 font-bold text-sm">00</span>
        </button>
      ))}
    </div>
  );
};

export default ActivityTabs;
