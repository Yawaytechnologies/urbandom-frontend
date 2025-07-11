// src/components/BuyPage/FeaturedProperties.jsx
import React, { useRef } from 'react';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      developer: 'DAC Developers',
      name: 'DAC Napa Valley',
      location: 'Ottiyambakkam, Chennai South',
      priceRange: '58.99 L - 69.0 L',
      type: '2, 3 BHK Apartments',
    },
    {
      id: 2,
      developer: 'Sameera Group',
      name: 'Sameera New Vision',
      location: 'Taramani, Chennai South',
      priceRange: '33.0 L - 2.22 Cr',
      type: 'Residential Plots',
    },
    {
      id: 3,
      developer: 'Prestige Estates',
      name: 'Prestige Avalon Bay',
      location: 'ECR, Chennai',
      priceRange: '1.20 Cr - 2.10 Cr',
      type: 'Luxury Villas',
    },
    {
      id: 4,
      developer: 'Sobha Developers',
      name: 'Sobha City',
      location: 'Porur, Chennai',
      priceRange: '78.0 L - 1.05 Cr',
      type: '2, 3, 4 BHK Apartments',
    },
    {
      id: 5,
      developer: 'TVS Sundaram Home Finance',
      name: 'Sundaram Hills Estate',
      location: 'Redhills, Chennai',
      priceRange: '45.0 L - 80.0 L',
      type: 'Independent Houses',
    },
    {
      id: 6,
      developer: 'Ashoka Builders',
      name: 'Ashoka Enclave',
      location: 'Anna Nagar, Chennai',
      priceRange: '1.10 Cr - 1.80 Cr',
      type: 'Luxury Apartments',
    },
  ];

  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      console.log('Scrolling Left'); // Debugging log
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      console.log('Scrolling Right'); // Debugging log
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Housing's Top Picks
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Explore top living options with us
        </p>
      </div>

      <div className="relative overflow-x-hidden pb-6">
        {/* Left Arrow */}
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

        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 md:px-12 py-2 scrollbar-hide"
        >
          {properties.map((prop) => (
            <div key={prop.id} className="transform transition duration-300 hover:scale-105 hover:shadow-xl min-w-[280px]">
              <PropertyCard property={prop} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
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
      </div>
    </section>
  );
};

export default FeaturedProperties;