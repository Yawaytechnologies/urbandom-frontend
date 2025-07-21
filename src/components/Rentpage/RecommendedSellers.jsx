import React, { useRef } from 'react';
import {  useSelector } from 'react-redux';


const RecommendedSellers = () => {
  
  const containerRef = useRef(null);

  // Get the list of recommended sellers from Redux store
  const { recommendedSellers, loading, error } = useSelector((state) => state.rentPage);



  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-8 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Recommended Sellers</h2>
        <p className="text-sm md:text-base mt-1 text-[var(--color-text-secondary)]">Top brokers and agents</p>
      </div>

      {/* Scrollable grid */}
      <div className="group relative overflow-x-hidden">
        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white text-black shadow hover:scale-110 transition-all duration-300 hidden md:flex md:opacity-0 md:group-hover:opacity-100"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto scroll-smooth px-2 md:px-4 scrollbar-hide pb-4"
        >
          {recommendedSellers.map((property) => (
            <div
              key={property._id}
              className="w-[270px] rounded-2xl border border-orange-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'var(--btn-gradient)' }}
                  >
                    {/* {property.title.substring(0, 2).toUpperCase()} Using first 2 letters of title for badge */}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
                    {property.title}
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
                <span className="font-bold">{property.priceDetails?.monthlyRent}</span> Monthly Rent &nbsp;|&nbsp;
                <span className="font-bold">{property.builtUpArea}</span> {property.areaUnit}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white text-black shadow hover:scale-110 transition-all duration-300 hidden md:flex md:opacity-0 md:group-hover:opacity-100"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default RecommendedSellers;
