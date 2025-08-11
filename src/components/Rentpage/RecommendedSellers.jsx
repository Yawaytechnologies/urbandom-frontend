import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const RecommendedSellers = () => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const { recommendedSellers, loading, error } = useSelector((state) => state.rentPage);

  // Check scroll position
  const updateArrowsVisibility = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateArrowsVisibility(); // Initial check
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateArrowsVisibility);
    window.addEventListener('resize', updateArrowsVisibility); // Recheck on resize

    return () => {
      container.removeEventListener('scroll', updateArrowsVisibility);
      window.removeEventListener('resize', updateArrowsVisibility);
    };
  }, []);

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <section className="py-6 px-3 sm:px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--color-foreground)]">Recommended Sellers</h2>
        <p className="text-sm sm:text-md text-center mt-1 text-[var(--color-text-secondary)]">Top brokers and agents</p>
      </div>

      {/* Scrollable Grid with arrows */}
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-md hover:scale-110 transition-all duration-300 opacity-90"
            aria-label="Scroll Left"
          >
            ←
          </button>
        )}

        {/* Cards */}
        <div
          ref={containerRef}
          className="grid grid-flow-col grid-rows-1 md:grid-rows-2 gap-4 overflow-x-auto scroll-smooth px-2 py-2 md:px-4 pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {recommendedSellers?.map((property) => (
            <div
              key={property._id}
              className="w-[240px] sm:w-[270px] snap-start rounded-2xl border border-orange-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'var(--btn-gradient)' }}
                  >
                    {property.title ? property.title.substring(0, 2).toUpperCase() : 'NA'}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
                    {property.title || 'Unnamed Property'}
                  </h3>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-[2px] rounded-full text-white uppercase ${
                    property.lookingTo === 'rent' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}
                >
                  {property.lookingTo === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
              </div>

              {/* Locations */}
              <div className="flex flex-wrap gap-1 mb-3">
                {property.location?.district?.name && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {property.location.district.name}
                  </span>
                )}
                {property.location?.state?.name && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {property.location.state.name}
                  </span>
                )}
              </div>

              {/* Price + Area */}
              <div className="text-xs text-gray-700 font-medium">
                <span className="font-bold">
                  {property.priceDetails?.monthlyRent ? `₹${property.priceDetails.monthlyRent}` : 'Price N/A'}
                </span>{' '}
                Monthly Rent &nbsp;|&nbsp;
                <span className="font-bold">{property.builtUpArea || 'N/A'}</span>{' '}
                {property.areaUnit || 'sq ft'}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={handleScrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-md hover:scale-110 transition-all duration-300 opacity-90"
            aria-label="Scroll Right"
          >
            →
          </button>
        )}
      </div>
    </section>
  );
};

export default RecommendedSellers;
