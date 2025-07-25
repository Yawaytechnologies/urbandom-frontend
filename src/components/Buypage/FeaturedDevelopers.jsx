import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedDevelopers } from '../../redux/actions/buyPageActions';

const FeaturedDevelopers = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { featuredDevelopers = [], loading, error } = useSelector((state) => state.buyPage);

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const updateScrollProgress = () => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const progress = (scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    dispatch(fetchFeaturedDevelopers());
  }, [dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollProgress);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollProgress);
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-8 px-4 md:px-12 bg-[--background]">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-[--foreground]">Featured Developers</h2>
        <p className="text-sm md:text-base mt-1 text-[--text-secondary]">Trusted names in real estate development</p>
      </div>

      <div className="group relative overflow-x-hidden pb-6">
        <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none hidden md:block bg-gradient-to-r from-[--background] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none hidden md:block bg-gradient-to-l from-[--background] to-transparent" />

        <button
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 hidden md:flex items-center justify-center rounded-full backdrop-blur-md shadow-md border border-white/20 text-white text-xl font-bold transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'var(--btn-gradient)', color: 'var(--text-primary)' }}
          aria-label="Scroll Left"
        >
          ‹
        </button>

        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-2 md:px-4 py-2 scrollbar-hide"
        >
          {featuredDevelopers.length === 0 ? (
            <div>No featured developers available.</div>
          ) : (
            featuredDevelopers.map((dev) => (
              <div
                key={dev._id}
                className="min-w-[220px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 text-center"
              >
                <div className="w-full h-32 mb-2 rounded-xl overflow-hidden">
                  <img
                    src={dev.media?.images[0] || '/default-image.jpg'}
                    alt={dev.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold truncate text-gray-800">{dev.title}</h3>
                <p className="text-xs text-gray-500 truncate">{dev.location?.name}</p>
                <p className="text-sm font-bold mt-1 text-[--accent]">₹{dev.priceDetails?.monthlyRent?.toLocaleString()}/month</p>
                <div className="mt-2 flex justify-center">
                  <span className="bg-yellow-400 text-black text-xs font-semibold rounded-full px-2 py-0.5">
                    ★ {dev.rating || 'N/A'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 hidden md:flex items-center justify-center rounded-full backdrop-blur-md shadow-md border border-white/20 text-white text-xl font-bold transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'var(--btn-gradient)', color: 'var(--text-primary)' }}
          aria-label="Scroll Right"
        >
          ›
        </button>
      </div>

      <div className="relative h-1 mt-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{ width: `${scrollProgress}%`, background: 'var(--accent)' }}
        />
      </div>
    </section>
  );
};

export default FeaturedDevelopers;
