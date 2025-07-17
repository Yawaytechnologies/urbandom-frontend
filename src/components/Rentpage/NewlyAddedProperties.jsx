import React, { useRef, useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaBed } from 'react-icons/fa';

const NewlyAddedProperties = ({ properties }) => {
  const containerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  let scrollInterval;

  // Scroll left functionality
  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Scroll right functionality
  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Calculate scroll progress
  const updateScrollProgress = () => {
    const container = containerRef.current;
    if (container) {
      const totalScroll = container.scrollWidth - container.clientWidth;
      const scrolled = container.scrollLeft;
      setScrollPercent((scrolled / totalScroll) * 100);
    }
  };

  // Set up event listener for scroll progress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollProgress);
    return () => container.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Auto-scroll behavior
  const startAutoScroll = (direction) => {
    scrollInterval = setInterval(() => {
      containerRef.current?.scrollBy({ left: direction === 'left' ? -10 : 10 });
    }, 16);
  };

  const stopAutoScroll = () => clearInterval(scrollInterval);

  return (
    <section className="relative py-10 px-4 md:px-8 bg-[var(--background)] overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Newly Added Properties</h2>
        <p className="text-sm md:text-base mt-1 text-[var(--text-secondary)]">
          Recently listed homes you might like
        </p>
      </div>

      <div className="group relative">
        {/* Edge Fades */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Arrows for scrolling */}
        <button
          onClick={handleScrollLeft}
          onMouseDown={() => startAutoScroll('left')}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white text-black rounded-full 
            shadow hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Cards displaying properties */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 py-2"
        >
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-blue-100 rounded-xl shadow-md 
                  hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 
                  min-w-[240px] md:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
              >
                {/* Image */}
                <div
                  className="h-40 bg-cover bg-center rounded-t-xl"
                  style={{ backgroundImage: `url(${property.media?.images[0] || '/default-image.jpg'})` }}
                ></div>

                {/* Info section */}
                <div className="p-4">
                  <h3 className="font-semibold text-base text-[var(--text-secondary)] mb-1 truncate">
                    {property.title || 'Unnamed Property'}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{property.developer || 'Developer not specified'}</p>

                  <hr className="border-t border-gray-200 my-3" />

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FaBed className="text-[var(--accent)]" />
                    <span>{property.type || 'Property type not specified'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-[var(--accent)]" />
                    <span>{property.location?.name || 'Location not specified'}</span>
                  </div>

                  <p className="text-base font-bold text-[var(--accent)] mb-3">
                    {property.priceDetails?.monthlyRent ? `₹${property.priceDetails.monthlyRent}` : 'Price not available'}
                  </p>

                  <button
                    className="w-full bg-[var(--accent)] text-white py-2 rounded-md 
                      hover:bg-opacity-90 transition font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No newly added properties found.</p>
          )}
        </div>

        {/* Right Arrow for scrolling */}
        <button
          onClick={handleScrollRight}
          onMouseDown={() => startAutoScroll('right')}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white text-black rounded-full 
            shadow hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>

      {/* Scroll Progress */}
      <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </section>
  );
};

export default NewlyAddedProperties;
