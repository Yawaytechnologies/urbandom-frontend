// src/components/BuyPage/PropertyList.jsx
import React, { useRef, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Auto-hide arrows based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.clientWidth;

        // Show/hide left arrow
        setShowLeftArrow(scrollLeft > 0);

        // Show/hide right arrow
        setShowRightArrow(
          scrollLeft + clientWidth < scrollWidth - 10 // Add a small offset for better UX
        );
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef]);

  const properties = [
    {
      id: 1,
      developer: 'DAC Developers',
      name: 'DAC Napa Valley',
      location: 'Ottiyambakkam, Chennai South',
      priceRange: '₹58.99 L - ₹69.0 L',
      type: '2, 3 BHK Apartments',
    },
    {
      id: 2,
      developer: 'Sameera Group',
      name: 'Sameera New Vision',
      location: 'Taramani, Chennai South',
      priceRange: '₹33.0 L - ₹2.22 Cr',
      type: 'Residential Plots',
    },
    {
      id: 3,
      developer: 'Prestige Estates',
      name: 'Prestige Avalon Bay',
      location: 'ECR, Chennai',
      priceRange: '₹1.20 Cr - ₹2.10 Cr',
      type: 'Luxury Villas',
    },
    {
      id: 4,
      developer: 'Sobha Developers',
      name: 'Sobha City',
      location: 'Porur, Chennai',
      priceRange: '₹78.0 L - ₹1.05 Cr',
      type: '2, 3, 4 BHK Apartments',
    },
    // Add more properties here...
  ];

  return (
    <section className="py-6 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Premium Properties
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Discover top-rated listings today
        </p>
      </div>

      <div className="relative overflow-x-hidden pb-6">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none"
            aria-label="Previous"
            style={{
              background: 'var(--color-gradient)',
            }}
          >
            ←
          </button>
        )}

        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide"
        >
          {properties.map((property) => (
            <div key={property.id} className="min-w-[280px]">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none"
            aria-label="Next"
            style={{
              background: 'var(--color-gradient)',
            }}
          >
            →
          </button>
        )}
      </div>
    </section>
  );
};

export default PropertyList;