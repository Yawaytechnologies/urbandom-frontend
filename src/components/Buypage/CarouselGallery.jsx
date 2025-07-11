// src/components/BuyPage/CarouselGallery.jsx
import React, { useRef } from 'react';

const CarouselGallery = () => {
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

  const images = [
    {
      id: 1,
      src: '/images/image1.jpg',
      title: 'Image 1',
      timestamp: '1 hour ago',
    },
    {
      id: 2,
      src: '/images/image2.jpg',
      title: 'Image 2',
      timestamp: '2 hours ago',
    },
    {
      id: 3,
      src: '/images/image3.jpg',
      title: 'Image 3',
      timestamp: '3 hours ago',
    },
    {
      id: 4,
      src: '/images/image4.jpg',
      title: 'Image 4',
      timestamp: '4 hours ago',
    },
    {
      id: 5,
      src: '/images/image5.jpg',
      title: 'Image 5',
      timestamp: '5 hours ago',
    },
  ];

  return (
    <section className="py-6 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Heading Section */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Top Highlighted Projects
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Noteworthy projects to watch
        </p>
      </div>

      {/* Scrollable Images */}
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

        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide"
        >
          {images.map((image) => (
            <div key={image.id} className="min-w-[280px]">
              <div className="relative bg-black h-64 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm mt-2">{image.timestamp}</p>
                  </div>
                </div>
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

export default CarouselGallery;