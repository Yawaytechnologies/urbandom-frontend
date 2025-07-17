import React, { useRef, useState, useEffect } from 'react';

const TopHighlighted = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Bluemoon Sea Breeze',
      developer: 'Bluemoon Properties',
      type: '3 BHK Apartment',
      location: 'Thiruvanmiyur, Chennai South, Chennai',
      price: '₹3.0 Cr',
      image: '/Property4.jpeg',
    },
    {
      id: 2,
      title: 'Vishwak Aira Avenue',
      developer: 'Vishwak Properties',
      type: 'Residential Plot, 3 BHK Villas',
      location: 'Vandalur, Chennai South, Chennai',
      price: '₹37.8 L - 1.51 Cr',
      image: '/Property1.jpeg',
    },
    {
      id: 3,
      title: 'Casagrand Arena',
      developer: 'Casagrand Builder',
      type: '2 & 3 BHK Villas',
      location: 'Oragadam, Chennai',
      price: '₹65 L - ₹1.2 Cr',
      image: '/Property2.jpeg',
    },
    {
      id: 4,
      title: 'Shriram Gateway',
      developer: 'Shriram Properties',
      type: '2 BHK Apartment',
      location: 'Perungalathur, Chennai',
      price: '₹45 L',
      image: '/Property2.jpeg',
    },
    {
      id: 5,
      title: 'Puravankara Windermere',
      developer: 'Puravankara Limited',
      type: 'Luxury 3 BHK',
      location: 'Pallikaranai, Chennai',
      price: '₹1.4 Cr',
      image: '/Property1.jpeg',
    },
    {
      id: 6,
      title: 'Urban Tree Wow',
      developer: 'Urban Tree',
      type: '1 & 2 BHK Flats',
      location: 'Porur, Chennai',
      price: '₹35 L - ₹55 L',
      image: '/Property3.jpeg',
    },
  ];

  const updateScrollProgress = () => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const progress = (container.scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollProgress);
      updateScrollProgress();
      return () => container.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  return (
    <section className="py-6 px-4 md:px-8 bg-[var(--background)]">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">
          Top highlighted projects
        </h2>
        <p className="text-sm md:text-base mt-1 text-[var(--text-secondary)]">
          Noteworthy projects to watch
        </p>
      </div>

      {/* Scrollable Cards */}
      <div ref={containerRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-hide px-1">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="relative min-w-[300px] max-w-[300px] h-64 rounded-xl overflow-hidden shadow-md group transition-all duration-300"
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/fallback.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10">
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <p className="text-sm">by {proj.developer}</p>
              <p className="text-sm mt-1">🛏️ {proj.type}</p>
              <p className="text-xs">📍 {proj.location}</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 text-sm rounded-md z-20">
              {proj.price}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Progress */}
      <div className="relative h-1 mt-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
};

export default TopHighlighted;
