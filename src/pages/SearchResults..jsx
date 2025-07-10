import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../redux/search/searchSlice';
import PropertyCard from '../components/user/PropertyCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { results, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    const type = searchParams.get('type') || 'buy';
    const location = searchParams.get('location') || 'Chennai';
    const query = searchParams.get('query') || '';

    dispatch(getSearchResults({ type, location, query }));
  }, [searchParams, dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results
      </h2>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && results?.length === 0 && (
        <p className="text-gray-500">No properties found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results?.map((item) => (
          <PropertyCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
