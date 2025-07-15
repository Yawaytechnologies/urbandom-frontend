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
    <div className="flex items-center gap-4 mb-4">
      <label className="text-sm font-semibold">Filter by search type:</label>
      {types.map((t) => (
        <label key={t} className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            value={t}
            checked={currentType === t}
            onChange={() => handleChange(t)}
          />
          {t}
        </label>
      ))}
    </div>
  );
};

export default SearchTypeFilter;
