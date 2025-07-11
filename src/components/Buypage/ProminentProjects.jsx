import React, { useRef } from 'react';
import PropertyCard from './PropertyCard';

const ProminentProjects = () => {
  const properties = [
    {
      id: 1,
      name: 'DAC Napa Valley',
      developer: 'DAC Developers',
      priceRange: '₹58.99 L - ₹69.0 L',
      type: '2, 3 BHK Apartments',
      location: 'Ottiyambakkam, Chennai South, Chennai',
      image: '/images/dac-napa-valley.jpg',
    },
    {
      id: 2,
      name: 'Shirdi Whitefield Mudra Phase B',
      developer: 'Shirdi Shelters',
      priceRange: '₹1.02 Cr - ₹1.19 Cr',
      type: '3 BHK Apartment',
      location: 'Medavakkam, Chennai South, Chennai',
      image: '/images/shirdi-whitefield-mudra-phase-b.jpg',
    },
    {
      id: 3,
      name: 'Prestige Avalon Bay',
      developer: 'Prestige Estates',
      priceRange: '₹1.20 Cr - ₹2.10 Cr',
      type: 'Luxury Villas',
      location: 'ECR, Chennai',
      image: '/images/prestige-avalon-bay.jpg',
    },
    {
      id: 4,
      name: 'Sobha City',
      developer: 'Sobha Developers',
      priceRange: '₹78.0 L - ₹1.05 Cr',
      type: '2, 3, 4 BHK Apartments',
      location: 'Porur, Chennai',
      image: '/images/sobha-city.jpg',
    },
    {
      id: 5,
      name: 'TVS Sundaram Hills Estate',
      developer: 'TVS Sundaram Home Finance',
      priceRange: '₹45.0 L - ₹80.0 L',
      type: 'Independent Houses',
      location: 'Redhills, Chennai',
      image: '/images/tvs-sundaram-hills.jpg',
    },
    {
      id: 6,
      name: 'Ashoka Enclave',
      developer: 'Ashoka Builders',
      priceRange: '₹1.10 Cr - ₹1.80 Cr',
      type: 'Luxury Apartments',
      location: 'Anna Nagar, Chennai',
      image: '/images/ashoka-enclave.jpg',
    },
  ];

  const containerRef = useRef(null);

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

  return (
    <section className="py-8 px-4 md:px-8 rounded-xl shadow-lg" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--color-foreground)' }}>
          Prominent Projects to Explore
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Best projects to look out for
        </p>
      </div>

      <div className="relative overflow-x-hidden pb-6">
        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none"
          aria-label="Previous"
          style={{
            backgroundColor: 'var(--color-gradient)',
            backgroundImage: 'var(--color-gradient)',
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
            <div
              key={prop.id}
              className="transform transition duration-300 hover:scale-105 hover:shadow-xl min-w-[280px]"
            >
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
            backgroundColor: 'var(--color-gradient)',
            backgroundImage: 'var(--color-gradient)',
          }}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default ProminentProjects;