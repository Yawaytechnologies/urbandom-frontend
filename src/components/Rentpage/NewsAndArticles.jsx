import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

const NewsAndArticles = () => {
  const containerRef = useRef(null);

const { newsAndArticles, loading, error} = useSelector((state) => state.rentPage);

  // Scroll left function
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Scroll right function
  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-8 px-4 md:px-8 bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">News and Articles</h2>
          <p className="text-sm md:text-base mt-1 text-[var(--text-secondary)]">
            Read what's happening in Real Estate
          </p>
        </div>
        <button className="bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition px-5 py-2 rounded-full text-sm font-medium">
          See all news and articles →
        </button>
      </div>

      {/* Scrollable Container */}
      <div className="relative group">
        {/* Gradient edge fade */}
        <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-10" />

        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className="hidden md:flex items-center justify-center absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 shadow-md"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Articles */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-1 md:px-4 py-2 scrollbar-hide"
        >
          {newsAndArticles.map((property) => (
            <div
              key={property.id}  // Use _id as the key for better performance
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-44 w-full bg-gray-200 rounded-t-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${property.media?.images[0] || '/defaultImage.jpg'})` }}  // Handle images
              />
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">{property.priceDetails?.monthlyRent ? `Rent: ₹${property.priceDetails.monthlyRent}` : 'No Rent Info'}</p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                  <span>{property.location?.name || 'Unknown Location'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className="hidden md:flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 shadow-md"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default NewsAndArticles;
