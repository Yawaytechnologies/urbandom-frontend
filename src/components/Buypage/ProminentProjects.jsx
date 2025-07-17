import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProminentProperties } from '../../redux/actions/buyPageActions';
import { FaPause, FaPlay } from 'react-icons/fa';

const ProminentProjects = () => {
  const dispatch = useDispatch();
  // Correct the state selector
  const { prominentProperties, isLoading, error } = useSelector(
    (state) => state.buyPage // Correct reference to buyPage
  );

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
    dispatch(fetchProminentProperties()); // Fetch prominent properties
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % prominentProperties.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, prominentProperties]);

  useEffect(() => {
    if (prominentProperties.length > 0) {
      scrollToIndex(activeIndex);
    }
  }, [activeIndex, prominentProperties.length]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-10 px-4 sm:px-6 md:px-8 bg-[var(--background)] rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]">
          Prominent Projects to Explore
        </h2>
        <p className="text-sm md:text-base mt-2 text-[var(--text-secondary)]">
          Best projects to look out for
        </p>
      </div>

      <div className="group relative overflow-x-hidden pb-6">
        {/* Left Arrow */}
        <button
          onClick={() => scrollToIndex(activeIndex - 1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 text-white text-xl font-bold opacity-0 group-hover:opacity-100"
          aria-label="Scroll Left"
          style={{ background: 'var(--color-gradient)', color: 'var(--text-primary)' }}
        >
          ‹
        </button>

        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth px-1 md:px-12 py-2 scrollbar-hide"
        >
          {prominentProperties.map((prop, idx) => (
            <div
              key={prop.id || prop._id} // Ensure a unique key is provided
              className={`w-[90vw] sm:w-[300px] md:w-[320px] flex-shrink-0 transition-transform duration-300 ease-in-out rounded-xl shadow-md overflow-hidden ${
                idx === activeIndex ? 'border-4 border-purple-600 shadow-2xl scale-[1.02]' : 'border border-gray-200'
              }`}
            >
              {/* Property Card Content */}
              <div className="flex flex-col justify-between bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full min-h-[420px]">
                <div
                  className="h-40 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${prop.media?.images?.[0] || ''})`, // Handle missing images
                  }}
                />
                <div className="flex flex-col flex-grow px-4 py-3">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {prop.title || 'Unnamed Property'} {/* Fallback to title */}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {prop.developer || 'Unknown Developer'}
                  </p>
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="flex items-center gap-1 mb-1">🛏️ {prop.subProperty || 'Unknown Type'}</p>
                    <p className="flex items-center gap-1">📍 {prop.location?.name || 'Unknown Location'}</p> {/* Handle location */}
                  </div>
                  <p className="mt-3 font-bold text-[var(--accent)]">
                    {prop.priceDetails?.monthlyRent ? `$${prop.priceDetails.monthlyRent}` : 'Price Not Available'}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-[var(--accent)] text-white rounded-md py-2 text-sm hover:brightness-110 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollToIndex(activeIndex + 1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 text-white text-xl font-bold opacity-0 group-hover:opacity-100"
          aria-label="Scroll Right"
          style={{ background: 'var(--color-gradient)', color: 'var(--text-primary)' }}
        >
          ›
        </button>
      </div>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsPaused((prev) => !prev)}
        className="absolute right-4 top-4 z-20 p-2 bg-white rounded-full shadow-md md:block hidden"
      >
        {isPaused ? <FaPlay className="text-gray-700" /> : <FaPause className="text-gray-700" />}
      </button>
    </section>
  );
};

export default ProminentProjects;
