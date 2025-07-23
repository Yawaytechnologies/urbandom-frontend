import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FeaturedDevelopers = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { featuredDevelopers = [], loading, error } = useSelector((state) => state.buyPage);

  // Scroll left functionality
  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Scroll right functionality
  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Function to calculate scroll progress
  const updateScrollProgress = () => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const progress = (scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  // Add event listener for scroll progress
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollProgress);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollProgress);
      }
    };
  }, []);

  // Display loading state
  if (loading) return <div>Loading...</div>;

  // Display error state
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-8 px-4 md:px-12" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
          Featured Developers
        </h2>
        <p className="text-sm md:text-base mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Trusted names in real estate development
        </p>
      </div>

      <div className="group relative overflow-x-hidden pb-6">
        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none hidden md:block"
             style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }} />
        <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none hidden md:block"
             style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }} />

        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
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
          {featuredDevelopers.length === 0 ? (
            <div>No featured developers available.</div>
          ) : (
            featuredDevelopers.map((dev) => (
              <div
                key={dev._id}  // Ensure you use the unique property (e.g., _id)
                className="min-w-[220px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[var(--accent)] transition-all duration-300 p-4 text-center transform hover:-translate-y-1"
              >
                <img
                  src={dev.media?.images[0] || '/default-image.jpg'}  // Display a default image if no image exists
                  alt={dev.title}
                  className="w-16 h-16 mx-auto object-contain mb-3"
                />
                <h3 className="font-semibold text-base text-gray-800">{dev.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{dev.priceDetails?.monthlyRent} / month</p>
                <div className="mt-3 flex justify-center items-center gap-1">
                  <span className="bg-yellow-400 text-black text-xs font-semibold rounded-full px-2 py-0.5">
                    ★ {dev.rating || 'N/A'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
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
