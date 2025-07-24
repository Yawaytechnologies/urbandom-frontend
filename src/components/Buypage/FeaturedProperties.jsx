// components/FeaturedProperties.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProperties } from '../../redux/actions/buyPageActions';
import { useNavigate } from 'react-router-dom';

const getValidImageUrl = (property) => {
  return property?.media?.images?.[0] || '/defaultImage.jpg';
};

const FeaturedProperties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featuredProperties, loading, error } = useSelector((state) => state.buyPage);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredProperties.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [featuredProperties, autoScroll]);

   const handleViewDetails = (propertyId) => {
    navigate(`/property-overview/${propertyId}`);
  };

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!featuredProperties.length) return null;

  const current = featuredProperties[currentIndex];

 

  return (
    <section className="bg-[var(--background)] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Housing's top picks</h2>
            <p className="text-sm text-gray-500">Explore top living options with us</p>
          </div>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className="border border-gray-400 px-4 py-1 rounded-full text-sm text-[var(--foreground)]"
          >
            {autoScroll ? '❚❚ Pause' : '▶ Play'}
          </button>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md bg-white p-4 flex flex-col md:flex-row gap-4 items-center">
          <img
            src={getValidImageUrl(current)}
            alt={current.title}
            className="w-full md:w-1/3 h-60 object-cover rounded-md"
          />
          <div className="flex-1 w-full">
            <h3 className="text-lg font-bold text-[var(--foreground)]">{current.title}</h3>
            <p className="text-sm text-gray-600">
              {current.location?.name}, {current.location?.state}
              {current.propertyType}
            </p>
            <p className="text-[var(--accent)] mt-2 font-semibold text-lg">
              ₹ {current.priceDetails?.amount?.toLocaleString()}
            </p>

            {/* ✅ View Details button */}
            <div className="mt-4 text-right">
              <button
                onClick={() => handleViewDetails(current._id)}
                className="text-sm px-4 py-2 bg-[var(--accent)] text-white rounded-full hover:opacity-90"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length)}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredProperties.length)}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded hover:opacity-90"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
