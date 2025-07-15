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
      image: '/property6.jpeg',
    },
    {
      id: 2,
      name: 'Shirdi Whitefield Mudra Phase B',
      developer: 'Shirdi Shelters',
      priceRange: '₹1.02 Cr - ₹1.19 Cr',
      type: '3 BHK Apartment',
      location: 'Medavakkam, Chennai South, Chennai',
      image: '/Property1.jpeg',
    },
    {
      id: 3,
      name: 'Prestige Avalon Bay',
      developer: 'Prestige Estates',
      priceRange: '₹1.20 Cr - ₹2.10 Cr',
      type: 'Luxury Villas',
      location: 'ECR, Chennai',
      image: '/property5.jpeg',
    },
    {
      id: 4,
      name: 'Sobha City',
      developer: 'Sobha Developers',
      priceRange: '₹78.0 L - ₹1.05 Cr',
      type: '2, 3, 4 BHK Apartments',
      location: 'Porur, Chennai',
      image: '/property7.jpeg',
    },
    {
      id: 5,
      name: 'TVS Sundaram Hills Estate',
      developer: 'TVS Sundaram Home Finance',
      priceRange: '₹45.0 L - ₹80.0 L',
      type: 'Independent Houses',
      location: 'Redhills, Chennai',
      image: '/property8.jpeg',
    },
    {
      id: 6,
      name: 'Ashoka Enclave',
      developer: 'Ashoka Builders',
      priceRange: '₹1.10 Cr - ₹1.80 Cr',
      type: 'Luxury Apartments',
      location: 'Anna Nagar, Chennai',
      image: '/property9.jpeg',
    },
  ];

  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

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
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 
                     w-10 h-10 hidden md:flex items-center justify-center rounded-full 
                     backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300
                     text-white text-xl font-bold opacity-0 group-hover:opacity-100"
          aria-label="Scroll Left"
          style={{
            background: 'var(--color-gradient)',
            color: 'var(--text-primary)',
          }}
        >
          ‹
        </button>

        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth px-1 md:px-12 py-2 scrollbar-hide"
        >
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="w-[90vw] sm:w-[300px] md:w-[320px] flex-shrink-0"
            >
              <PropertyCard property={prop} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 
                     w-10 h-10 hidden md:flex items-center justify-center rounded-full 
                     backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300
                     text-white text-xl font-bold opacity-0 group-hover:opacity-100"
          aria-label="Scroll Right"
          style={{
            background: 'var(--color-gradient)',
            color: 'var(--text-primary)',
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default ProminentProjects;
