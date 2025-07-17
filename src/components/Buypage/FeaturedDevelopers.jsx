import React, { useRef, useState, useEffect } from 'react';

const FeaturedDevelopers = () => {
  const containerRef = useRef(null);
  const scrollInterval = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const developers = [
    {
      id: 1,
      name: 'DAC Developers',
      projects: '25+ Projects',
      rating: '4.8',
      logo: '/logo1.jpeg',
    },
    {
      id: 2,
      name: 'Prestige Estates',
      projects: '18+ Projects',
      rating: '4.7',
      logo: '/logo2.png',
    },
    {
      id: 3,
      name: 'Sobha Developers',
      projects: '30+ Projects',
      rating: '4.9',
      logo: '/logo3.png',
    },
    {
      id: 4,
      name: 'TVS Sundaram Home Finance',
      projects: '12+ Projects',
      rating: '4.6',
      logo: '/logo4.jpeg',
    },
    {
      id: 5,
      name: 'Ashoka Builders',
      projects: '20+ Projects',
      rating: '4.5',
      logo: '/logo1.jpeg',
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

  const startAutoScroll = (direction) => {
    scrollInterval.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: direction * 20, behavior: 'smooth' });
      }
    }, 50);
  };

  const stopAutoScroll = () => {
    clearInterval(scrollInterval.current);
  };

  return (
    <section className="py-8 px-4 md:px-12" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
          Featured Developers
        </h2>
        <p className="text-sm md:text-base mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Trusted names in real estate development
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="group relative overflow-x-hidden pb-6">
        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none hidden md:block"
             style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }} />
        <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none hidden md:block"
             style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }} />

        {/* Left Arrow */}
        <button
          onMouseDown={() => startAutoScroll(-1)}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          onTouchStart={() => startAutoScroll(-1)}
          onTouchEnd={stopAutoScroll}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 
                     w-10 h-10 items-center justify-center rounded-full 
                     backdrop-blur-md shadow-md border border-white/20 
                     text-white text-xl font-bold transition-all duration-300
                     hidden md:flex md:opacity-0 md:group-hover:opacity-100"
          style={{
            background: 'var(--btn-gradient)',
            color: 'var(--text-primary)',
          }}
          aria-label="Scroll Left"
        >
          ‹
        </button>

        {/* Developer Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-2 md:px-4 py-2 scrollbar-hide"
        >
          {developers.map((dev) => (
            <div
              key={dev.id}
              className="min-w-[220px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[var(--accent)] transition-all duration-300 p-4 text-center transform hover:-translate-y-1"
            >
              <img
                src={dev.logo}
                alt={dev.name}
                className="w-16 h-16 mx-auto object-contain mb-3"
              />
              <h3 className="font-semibold text-base text-gray-800">{dev.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{dev.projects}</p>
              <div className="mt-3 flex justify-center items-center gap-1">
                <span className="bg-yellow-400 text-black text-xs font-semibold rounded-full px-2 py-0.5">
                  ★ {dev.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onMouseDown={() => startAutoScroll(1)}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          onTouchStart={() => startAutoScroll(1)}
          onTouchEnd={stopAutoScroll}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 
                     w-10 h-10 items-center justify-center rounded-full 
                     backdrop-blur-md shadow-md border border-white/20 
                     text-white text-xl font-bold transition-all duration-300
                     hidden md:flex md:opacity-0 md:group-hover:opacity-100"
          style={{
            background: 'var(--btn-gradient)',
            color: 'var(--text-primary)',
          }}
          aria-label="Scroll Right"
        >
          ›
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div className="relative h-1 mt-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
            background: 'var(--accent)',
          }}
        />
      </div>
    </section>
  );
};

export default FeaturedDevelopers;
