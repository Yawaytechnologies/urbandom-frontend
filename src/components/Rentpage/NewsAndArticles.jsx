import React, { useRef } from 'react';

const NewsAndArticles = () => {
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

  const articles = [
    {
      id: 1,
      title: 'Stamp duty and land registration charges in Tamil Nadu 2025',
      author: 'Harini Balasubramanian',
      date: 'Jul 2025',
      description:
        'The stamp duty in Tamil Nadu for new property registrations is 7% of property value while registration fee is 4% of total property value.',
      image: '/Property1.jpeg',
    },
    {
      id: 2,
      title: 'Mysore to Chennai bullet train route details and real estate impact',
      author: 'Harini Balasubramanian',
      date: 'Jun 2025',
      description:
        'The high-speed rail corridor will comprise nine stations in Tamil Nadu and Karnataka.',
      image: '/Property2.jpeg',
    },
    {
      id: 3,
      title: 'What is repo rate? How does it impact your home loan EMIs in 2025?',
      author: 'Anuradha Ramamirtham',
      date: 'Jun 2025',
      description:
        'Explained in this article is the inner working of the repo rate that impacts your home loan EMIs.',
      image: '/property8.jpeg',
    },
    {
      id: 4,
      title: 'Impact of GST on Real Estate in India',
      author: 'Rajesh Kumar',
      date: 'May 2025',
      description:
        'Understanding the implications of GST on real estate transactions and property prices.',
      image: '/Property3.jpeg',
    },
    {
      id: 5,
      title: 'Top Real Estate Trends in 2025',
      author: 'Sonia Singh',
      date: 'Apr 2025',
      description:
        'Key trends shaping the real estate market in 2025, including sustainable housing and smart homes.',
      image: '/property5.jpeg',
    },
  ];

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

      {/* Scrollable Container */}
      <div className="relative group">
        {/* Gradient edge fade */}
        <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-10" />

        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className="hidden md:flex items-center justify-center absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 shadow-md"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Articles */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-1 md:px-4 py-2 scrollbar-hide"
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-44 w-full bg-gray-200 rounded-t-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
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
