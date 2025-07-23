// src/components/BuyPage/HighDemandProjects.jsx
import React, { useRef } from 'react';

const HighDemandProjects = () => {
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

  const properties = [
    {
      id: 1,
      name: 'DAC Napa Valley',
      developer: 'DAC Developers',
      type: '2, 3 BHK Apartments',
      location: 'Ottiyambakkam, Chennai South, Chennai',
      priceRange: '₹58.99 L - ₹69.0 L',
      image: '/images/dac-napa-valley.jpg', // Replace with real path
    },
    {
      id: 2,
      name: 'Nahar Arista',
      developer: 'Nahar Foundation\'s Pvt. Ltd.',
      type: '3 BHK Apartment',
      location: 'Perungudi, Chennai South, Chennai',
      priceRange: '₹1.66 Cr - ₹1.87 Cr',
      image: '/images/nahar-arista.jpg',
    },
    {
      id: 3,
      name: 'Casagrand Osaka',
      developer: 'Casagrand Builder Private Limited',
      type: '3, 4 BHK Apartments',
      location: 'Iyyappanthangal, Chennai West, Chennai',
      priceRange: '₹73.0 L - ₹1.26 Cr',
      image: '/images/casagrand-osaka.jpg',
    },
    {
      id: 4,
      name: 'Prestige Avalon Bay',
      developer: 'Prestige Estates',
      type: 'Luxury Villas',
      location: 'ECR, Chennai',
      priceRange: '₹1.20 Cr - ₹2.10 Cr',
      image: '/images/prestige-avalon-bay.jpg',
    },
    {
      id: 5,
      name: 'Sobha City',
      developer: 'Sobha Developers',
      type: '2, 3, 4 BHK Apartments',
      location: 'Porur, Chennai',
      priceRange: '₹78.0 L - ₹1.05 Cr',
      image: '/images/sobha-city.jpg',
    },
  ];

  return (
    <section className="py-6 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Section Heading */}
      <div className=" mb-6">
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          High Demand Projects
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Popular projects in high demand
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

        {/* Property Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide"
        >
          {properties.map((property) => (
            <div key={property.id} className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <p className="text-sm text-gray-600 mt-1">by {property.developer}</p>
                <p className="text-sm mt-2">{property.type}</p>
                <p className="text-sm mt-1">{property.location}</p>
                <p className="text-lg font-bold mt-4">{property.priceRange}</p>
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

export default HighDemandProjects;