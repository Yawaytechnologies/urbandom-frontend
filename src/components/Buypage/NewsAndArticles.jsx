import React, { useRef } from 'react';

const NewsAndArticles = () => {
  const containerRef = useRef(null);

  // ✅ Dummy data using public images
  const newsAndArticles = [
    {
      _id: '1',
      title: 'Top Real Estate Trends to Watch in 2025',
      media: { images: ['/download.jpg'] },
      priceDetails: { monthlyRent: 25000 },
      createdAt: '2025-07-20T10:00:00Z',
      location: { name: 'Mumbai' },
    },
    {
      _id: '2',
      title: 'How to Invest Smartly in Commercial Properties',
      media: { images: ['/download2.jpg'] },
      priceDetails: { monthlyRent: 35000 },
      createdAt: '2025-07-18T09:30:00Z',
      location: { name: 'Bengaluru' },
    },
    {
      _id: '3',
      title: 'Top 10 Cities for Residential Real Estate Growth',
      media: { images: ['/download3.jpg'] },
      priceDetails: {},
      createdAt: '2025-07-15T12:15:00Z',
      location: { name: 'Hyderabad' },
    },
    {
      _id: '4',
      title: 'Government Policies Impacting Rental Market in India',
      media: { images: ['/download1.jpg'] },
      priceDetails: { monthlyRent: 18000 },
      createdAt: '2025-07-10T11:45:00Z',
      location: { name: 'Delhi' },
    },
  ];

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-8 px-4 md:px-8 bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">News and Articles</h2>
          <p className="text-sm md:text-base mt-1 text-[var(--text-secondary)]">
            Read what's happening in Real Estate
          </p>
        </div>
        <button className="bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition px-5 py-2 rounded-full text-sm font-medium">
          See all news and articles →
        </button>
      </div>

      {/* Scrollable Section */}
      <div className="relative group">
        {/* Gradient edge fade */}
        <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-10" />

        {/* Scroll Left */}
        <button
          onClick={handleScrollLeft}
          className="hidden md:flex items-center justify-center absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 shadow-md"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-1 md:px-4 py-2 scrollbar-hide"
        >
          {newsAndArticles.map((article) => (
            <div
              key={article._id}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div
                className="h-44 w-full bg-gray-200 rounded-t-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${article.media?.images?.[0] || '/default.jpg'})`,
                }}
              />
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {article.priceDetails?.monthlyRent
                    ? `Rent: ₹${article.priceDetails.monthlyRent}`
                    : 'No Rent Info'}
                </p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  <span>{article.location?.name || 'Unknown'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Right */}
        <button
          onClick={handleScrollRight}
          className="hidden md:flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 shadow-md"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default NewsAndArticles;
