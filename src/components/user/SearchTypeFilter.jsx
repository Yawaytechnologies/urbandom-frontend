import React from 'react';
import { useSearchParams } from 'react-router-dom';

const types = ['Buy', 'Rent', 'PG'];

const SearchTypeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get('search') || 'Buy';
  const activityType = searchParams.get('type') || 'contacted';

  const handleChange = (newType) => {
    setSearchParams({ type: activityType, search: newType });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Filter by Search Type:
      </label>
      <div className="flex flex-wrap gap-3">
        {types.map((type) => {
          const isActive = currentType === type;
          return (
            <button
              key={type}
              onClick={() => handleChange(type)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 focus:outline-none
                ${isActive
                  ? 'bg-gradient-to-r from-[#7e5bef] to-[#5e4eea] text-white shadow-md'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-purple-400 hover:text-purple-600'}`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchTypeFilter;
