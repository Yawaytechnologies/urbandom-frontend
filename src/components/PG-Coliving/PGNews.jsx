import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const articles = [
  {
    title: "Luxury housing sales record 85% YoY growth in Jan–Jun ‘25: Report",
    summary:
      "Delhi-NCR registers the highest sales in the luxury segment, contributing 57% to the overall pie, mentioned the report.",
    image: "/Luxury-feature-compressed.jpg",
    author: "Anuradha Ramamirtham",
    date: "Jul 2025",
  },
  {
    title: "Stamp duty and land registration charges in Tamil Nadu 2025",
    summary:
      "The stamp duty in Tamil Nadu for new property registrations is 7% of property value while registration fee is 4% of total property value.",
    image: "/Stamp-duty-and-registration-charges-in-Tamil-Nadu-FB-1200x700-compressed.jpg",
    author: "Harini Balasubramanian",
    date: "Jul 2025",
  },
  {
    title: "Mysore to Chennai bullet train route details and real estate impact",
    summary:
      "The high-speed rail corridor will comprise nine stations in Tamil Nadu and Karnataka.",
    image: "/Mysore-Bangalore-Chennai-Bullet-Train-project-Land-and-aerial-surveys-underway-f.jpg",
    author: "Harini Balasubramanian",
    date: "Jun 2025",
  },
  {
    title: "What is repo rate? How it impacts home loan EMIs in 2025",
    summary:
      "Explained in this article is the role of the repo rate that impacts your loan EMIs.",
    image: "/Everything-home-buyers-need-to-know-about-the-repo-rate-and-how-it-affects-them-FB-1200x700-compressed.jpg",
    author: "Anuradha Ramamirtham",
    date: "Jun 2025",
  },
  {
    title: "Casagrand launches residential community in Siruseri, Chennai",
    summary:
      "The project offers 469 houses–2,3 and 4 BHK apartments constructed in a B+G+5 structure with 65% open space and modern courtyards",
    image: "/Tower-crane-Benefits-types-components-and-other-details-f.jpg",
    author: "Anuradha Ramamirtham",
    date: "Apr 2025",
  },
  {
    title: "Q1 home sales, launches drop amid price hikes and geopolitical concerns: PropTiger",
    summary:
      "Against the backdrop of worsening geopolitical concerns that can deeply impact the domestic job market, sales fell in all key residential markets except...",
    image: "/shutterstock_1365626660-1200x700-compressed.jpg",
    author: "Harini Balasubramanian",
    date: "Apr 2025",
  },
  {
    title: "Casagrand launches its first senior living project at Pudupakkam, Chennai",
    summary:
      "The project is equipped with a state-of-the-art mini-clinic, an on-premises physiotherapy room, 24X7 ambulance service for prompt and efficient medical care.",
    image: "/Casagrand-launches-its-first-senior-living-project-at-Pudupakkam-Chennai-f.jpg",
    author: "Harini Balasubramanian",
    date: "Apr 2025",
  },
  {
    title: "How to pay Chennai property tax online?",
    summary:
      "Check out how to calculate and avail by paying the Chennai...",
    image: "/A-guide-to-paying-property-tax-in-Chennai-FB-1200x700-compressed.jpg",
    author: "Anuradha Ramamirtham",
    date: "Apr 2025",
  },
];

const NewsArticlesSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-12 px-6 relative max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            News & <span className="font-bold">Articles</span>
          </h2>
          <p className="text-sm text-gray-500">
            Read what's happening in Real Estate
          </p>
        </div>
        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="w-10 h-10 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            ref={nextRef}
            className="w-10 h-10 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4 },
        }}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex justify-between text-sm text-gray-500 border-t pt-2 mt-2">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsArticlesSlider;
