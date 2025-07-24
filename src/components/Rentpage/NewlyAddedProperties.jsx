import React, { useRef, useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewlyAddedProperties} from '../../redux/actions/rentPageAction';

const NewlyAddedProperties = () => {
  const containerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { newlyAddedProperties, loading, error } = useSelector((state) => state.rentPage);

  useEffect(() => {
    dispatch(fetchNewlyAddedProperties());
  }, [dispatch]);

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const updateScrollProgress = () => {
    const container = containerRef.current;
    if (container) {
      const totalScroll = container.scrollWidth - container.clientWidth;
      const scrolled = container.scrollLeft;
      setScrollPercent((scrolled / totalScroll) * 100);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollProgress);
    return () => container.removeEventListener('scroll', updateScrollProgress);
  }, []);

    const handleViewDetails = (propertyId) => {
      navigate(`/property-overview/${propertyId}`);
    };

  return (
    <section className="relative py-10 px-4 md:px-8 bg-[var(--background)] overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Newly Added Properties</h2>
        <p className="text-sm md:text-base mt-1 text-[var(--text-secondary)]">
          Recently listed homes you might like
        </p>
      </div>

      <div className="group relative">
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <button
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white text-black rounded-full 
            shadow hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Scroll Left"
        >
          ←
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 py-2"
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : newlyAddedProperties.length > 0 ? (
            newlyAddedProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-blue-100 rounded-xl shadow-md 
                  hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 
                  min-w-[240px] md:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
              >
                 {/* Image */}
                <div className="w-full h-[180px]">
                  {property.media?.images?.[0] ? (
                    <img
                      src={property.media.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-base text-[var(--text-secondary)] mb-1 truncate">
                    {property.title || 'Unnamed Property'}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{property.lookingTo || 'Developer not specified'}</p>

                  <hr className="border-t border-gray-200 my-3" />

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FaBed className="text-[var(--accent)]" />
                    <span>{property.propertyType || 'Property type not specified'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-[var(--accent)]" />
                    <span>{property.location?.name || 'Location not specified'}</span>
                  </div>

                  <p className="text-base font-bold text-[var(--accent)] mb-3">
                    {property.priceDetails?.monthlyRent ? `₹${property.priceDetails.monthlyRent}` : 'Price not available'}
                  </p>

                  <button
                    onClick={() => handleViewDetails(property._id)}
                    className="w-full bg-[var(--accent)] text-white py-2 rounded-md 
                      hover:bg-opacity-90 transition font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No newly added Properties found.</p>
          )}
        </div>

        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white text-black rounded-full 
            shadow hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>

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
