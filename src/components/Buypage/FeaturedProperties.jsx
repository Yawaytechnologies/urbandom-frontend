import React, { useRef, useState, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

const FeaturedProperties = ({ properties }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 300;
      container.scrollTo({
        left: index * (cardWidth + 20),
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % properties.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, properties.length]); // Add properties.length to the dependency array

  useEffect(() => {
    if (properties.length > 0) {
      scrollToIndex(activeIndex);
    }
  }, [activeIndex, properties.length]); // Add properties.length to the dependency array

  return (
    <section className="py-6 px-4 md:px-8 bg-[var(--background)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Housing's top picks</h2>
        <p className="text-sm text-[var(--text-secondary)]">Explore top living options with us</p>
      </div>

      {/* Tabs for Property Names */}
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-4 -mx-2 px-2">
        {properties && properties.map((property, idx) => (
          <button
            key={property._id || idx}
            className={`text-sm whitespace-nowrap px-3 py-1 rounded-full border transition-all duration-300 shrink-0 ${
              idx === activeIndex
                ? 'bg-white border-purple-600 text-purple-600 font-semibold shadow'
                : 'bg-gray-100 text-gray-600 border-transparent'
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            {property.title || 'Unnamed Property'}  {/* Display property title */}
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <div className="group relative overflow-hidden">
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="absolute right-4 top-4 z-20 p-2 bg-white rounded-full shadow-md md:block hidden"
        >
          {isPaused ? <FaPlay className="text-gray-700" /> : <FaPause className="text-gray-700" />}
        </button>

        <div ref={containerRef} className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-1 py-2">
          {properties && properties.map((property, idx) => (
            <div
              key={property._id || idx}
              className={`w-[85vw] sm:w-[280px] md:w-[320px] lg:w-[340px] flex-shrink-0 transition-transform duration-300 ease-in-out rounded-xl shadow-md overflow-hidden ${
                idx === activeIndex ? 'border-4 border-purple-600 shadow-2xl scale-[1.02]' : 'border border-gray-200'
              }`}
            >
              {/* Property Card Content */}
              <div className="flex flex-col justify-between bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full min-h-[420px]">
                {/* Image Background */}
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.media.images[0]})` }}  // Make sure property.media.images[0] is a valid URL
                />

                {/* Details */}
                <div className="flex flex-col flex-grow px-4 py-3">
                  {/* Render property name */}
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{property.title}</h3>

                  <div className="mt-3 text-sm text-gray-600">
                    {/* Render property details like type and location */}
                    <p className="flex items-center gap-1 mb-1">🛏️ {property.subProperty}</p>
                    <p className="flex items-center gap-1">📍 {property.location?.name || 'Location Not Available'}</p>
                  </div>

                  {/* Property Price Range */}
                  <p className="mt-3 font-bold text-[var(--accent)]">
                    {property.priceDetails?.monthlyRent ? `₹${property.priceDetails.monthlyRent}` : 'Price Not Available'}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="px-4 pb-4">
                  <button className="w-full bg-[var(--accent)] text-white rounded-md py-2 text-sm hover:brightness-110 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
