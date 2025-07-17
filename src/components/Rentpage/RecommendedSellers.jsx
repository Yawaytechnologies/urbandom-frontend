// src/components/BuyPage/RecommendedSellers.jsx
import React, { useRef } from 'react';

const RecommendedSellers = () => {
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const sellers = [
    {
      id: 1,
      name: 'Tora properties pvt ltd',
      badge: 'TP',
      label: 'HOUSING EXPERT PRO',
      experience: 0,
      properties: 175,
      locations: ['Padur', 'Medavakkam'],
    },
    {
      id: 2,
      name: 'STAAR HOMES PROJECTS',
      badge: 'SH',
      label: 'HOUSING EXPERT PRO',
      experience: 0.5,
      properties: 96,
      locations: ['Padur', 'Thazhambur'],
    },
    {
      id: 3,
      name: 'NEW STARCITY',
      badge: 'NS',
      label: 'HOUSING EXPERT PRO',
      experience: 0.5,
      properties: 58,
      locations: ['Madhavaram', 'Red Hills'],
    },
    {
      id: 4,
      name: 'GODSON BUILDERS',
      badge: 'GB',
      label: 'HOUSING EXPERT',
      experience: 13,
      properties: 14,
      locations: ['Royappa Nagar', 'Pallikaranai'],
    },
    {
      id: 5,
      name: 'JK properties',
      badge: 'JP',
      label: 'HOUSING EXPERT',
      experience: 18,
      properties: 36,
      locations: ['Ponmar', 'Mambakkam'],
    },
    {
      id: 6,
      name: 'VETRI VELAN PROPERTIES',
      badge: 'VV',
      label: 'HOUSING EXPERT',
      experience: 11,
      properties: 40,
      locations: ['Ponmar', 'Ottiyambakkam'],
    },
        {
      id: 7,
      name: 'VETRI VELAN PROPERTIES',
      badge: 'VV',
      label: 'HOUSING EXPERT',
      experience: 11,
      properties: 40,
      locations: ['Ponmar', 'Ottiyambakkam'],
    },
        {
      id: 8,
      name: 'VETRI VELAN PROPERTIES',
      badge: 'VV',
      label: 'HOUSING EXPERT',
      experience: 11,
      properties: 40,
      locations: ['Ponmar', 'Ottiyambakkam'],
    },
     {
      id: 9,
      name: 'VETRI VELAN PROPERTIES',
      badge: 'VV',
      label: 'HOUSING EXPERT',
      experience: 11,
      properties: 40,
      locations: ['Ponmar', 'Ottiyambakkam'],
    },
     {
      id: 10,
      name: 'VETRI VELAN PROPERTIES',
      badge: 'VV',
      label: 'HOUSING EXPERT',
      experience: 11,
      properties: 40,
      locations: ['Ponmar', 'Ottiyambakkam'],
    },
  ];

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
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 
                   items-center justify-center rounded-full bg-white text-black 
                   shadow hover:scale-110 transition-all duration-300
                   hidden md:flex md:opacity-0 md:group-hover:opacity-100"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto scroll-smooth px-2 md:px-4 scrollbar-hide pb-4"
        >
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="w-[270px] rounded-2xl border border-orange-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'var(--btn-gradient)' }}
                  >
                    {seller.badge}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
                    {seller.name}
                  </h3>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-[2px] rounded-full text-white uppercase ${
                    seller.label.includes('PRO') ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}
                >
                  {seller.label}
                </span>
              </div>

              {/* Locations */}
              <div className="flex flex-wrap gap-1 mb-3">
                {seller.locations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {loc}
                  </span>
                ))}
              </div>

              {/* Experience + Properties */}
              <div className="text-xs text-gray-700 font-medium">
                <span className="font-bold">{seller.experience}</span> years Experience &nbsp;|&nbsp;
                <span className="font-bold">{seller.properties}</span> Properties
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 
                   items-center justify-center rounded-full bg-white text-black 
                   shadow hover:scale-110 transition-all duration-300
                   hidden md:flex md:opacity-0 md:group-hover:opacity-100"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default RecommendedSellers;
