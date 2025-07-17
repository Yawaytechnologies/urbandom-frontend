// src/components/BuyPage/TrustedDevelopers.jsx
import React, { useRef } from 'react';

const TrustedDevelopers = () => {
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

  const developers = [
    {
      id: 1,
      name: 'DAC Developers',
      projects: '25+ Projects',
      rating: '4.8',
      logo: '/logos/dac-developers.png', // Replace with actual paths
    },
    {
      id: 2,
      name: 'Prestige Estates',
      projects: '18+ Projects',
      rating: '4.7',
      logo: '/logos/prestige-estates.png',
    },
    {
      id: 3,
      name: 'Sobha Developers',
      projects: '30+ Projects',
      rating: '4.9',
      logo: '/logos/sobha-developers.png',
    },
    {
      id: 4,
      name: 'TVS Sundaram Home Finance',
      projects: '12+ Projects',
      rating: '4.6',
      logo: '/logos/tvs-developers.png',
    },
    {
      id: 5,
      name: 'Ashoka Builders',
      projects: '20+ Projects',
      rating: '4.5',
      logo: '/logos/ashoka-builders.png',
    },
  ];

  return (
    <section className="py-6 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Heading */}
      <div className=" mb-6">
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Trusted Developers
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Reliable partners in real estate development
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="relative overflow-x-hidden pb-6">
        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none"
          aria-label="Previous"
          style={{
            background: 'var(--btn-gradient)',
          }}
        >
          ←
        </button>

        {/* Developer Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide"
        >
          {developers.map((dev) => (
            <div
              key={dev.id}
              className="min-w-[200px] bg-white rounded-lg shadow-md p-4 flex-shrink-0 text-center"
            >
              <img
                src={dev.logo}
                alt={dev.name}
                className="w-16 h-16 mx-auto object-contain mb-3"
              />
              <h3 className="font-semibold text-lg">{dev.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{dev.projects}</p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">{dev.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none"
          aria-label="Next"
          style={{
            background: 'var(--btn-gradient)',
          }}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default TrustedDevelopers;