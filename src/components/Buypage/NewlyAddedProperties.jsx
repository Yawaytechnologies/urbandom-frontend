import React, { useRef, useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaBed } from 'react-icons/fa';

const NewlyAddedProperties = () => {
  const containerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  let scrollInterval;

  const properties = [
    {
      id: 1,
      name: 'DAC Napa Valley',
      developer: 'DAC Developers',
      type: '2 BHK Apartment',
      location: 'Ottiyambakkam, Chennai South',
      priceRange: '₹58.99 L - ₹69.0 L',
      image: '/Property1.jpeg',
    },
    {
      id: 2,
      name: 'Nahar Arista',
      developer: 'Nahar Foundation Pvt. Ltd.',
      type: '3 BHK Apartment',
      location: 'Perungudi, Chennai South',
      priceRange: '₹1.66 Cr - ₹1.87 Cr',
      image: '/Property5.jpeg',
    },
    {
      id: 3,
      name: 'Casagrand Osaka',
      developer: 'Casagrand Builder Private Limited',
      type: '3 BHK Apartment',
      location: 'Iyyappanthangal, Chennai West',
      priceRange: '₹73.0 L - ₹1.26 Cr',
      image: '/Property4.jpeg',
    },
    {
      id: 4,
      name: 'Prestige Avalon Bay',
      developer: 'Prestige Estates',
      type: 'Luxury Villas',
      location: 'ECR, Chennai',
      priceRange: '₹1.20 Cr - ₹2.10 Cr',
      image: '/Property9.jpeg',
    },
    {
      id: 5,
      name: 'Sobha City',
      developer: 'Sobha Developers',
      type: '2, 3, 4 BHK Apartments',
      location: 'Porur, Chennai',
      priceRange: '₹78.0 L - ₹1.05 Cr',
      image: '/Property3.jpeg',
    },
    {
      id: 6,
      name: 'Ashoka Enclave',
      developer: 'Ashoka Builders',
      type: 'Luxury Apartments',
      location: 'Anna Nagar, Chennai',
      priceRange: '₹1.10 Cr - ₹1.80 Cr',
      image: '/Property5.jpeg',
    },
  ];

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

  const startAutoScroll = (direction) => {
    scrollInterval = setInterval(() => {
      containerRef.current?.scrollBy({ left: direction === 'left' ? -10 : 10 });
    }, 16);
  };

  const stopAutoScroll = () => clearInterval(scrollInterval);

  return (
    <section className="relative py-10 px-4 md:px-8 bg-[var(--background)] overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Newly Added Properties</h2>
        <p className="text-sm md:text-base mt-1 text-[var(--text-secondary)]">
          Recently listed homes you might like
        </p>
      </div>

      <div className="group relative">
        {/* Edge Fades */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Arrows */}
        <button
          onClick={handleScrollLeft}
          onMouseDown={() => startAutoScroll('left')}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white text-black rounded-full 
            shadow hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 py-2"
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-blue-100 rounded-xl shadow-md 
                hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 
                min-w-[240px] md:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
            >
              {/* Image */}
              <div
                className="h-40 bg-cover bg-center rounded-t-xl"
                style={{ backgroundImage: `url(${property.image})` }}
              ></div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-base text-[var(--text-secondary)] mb-1 truncate">
                  {property.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{property.developer}</p>

                <hr className="border-t border-gray-200 my-3" />

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaBed className="text-[var(--accent)]" />
                  <span>{property.type}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-[var(--accent)]" />
                  <span>{property.location}</span>
                </div>

                <p className="text-base font-bold text-[var(--accent)] mb-3">
                  {property.priceRange}
                </p>

                <button
                  className="w-full bg-[var(--accent)] text-white py-2 rounded-md 
                    hover:bg-opacity-90 transition font-medium text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleScrollRight}
          onMouseDown={() => startAutoScroll('right')}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white text-black rounded-full 
            shadow hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>

      {/* Scroll Progress */}
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
