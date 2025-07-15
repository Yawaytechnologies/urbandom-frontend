import React, { useRef, useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { FaPause, FaPlay } from "react-icons/fa";

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      developer: "DAC Developers",
      name: "DAC Napa Valley",
      location: "Ottiyambakkam, Chennai South",
      priceRange: "₹58.99 L - ₹69.0 L",
      type: "2, 3 BHK Apartments",
      image: "/Property1.jpeg",
    },
    {
      id: 2,
      developer: "Sameera Group",
      name: "Sameera New Vision",
      location: "Taramani, Chennai South",
      priceRange: "₹33.0 L - ₹2.22 Cr",
      type: "Residential Plots",
      image: "/Property2.jpeg",
    },
    {
      id: 3,
      developer: "Prestige Estates",
      name: "Prestige Avalon Bay",
      location: "ECR, Chennai",
      priceRange: "₹1.20 Cr - ₹2.10 Cr",
      type: "Luxury Villas",
      image: "/Property3.jpeg",
    },
    {
      id: 4,
      developer: "Sobha Developers",
      name: "Sobha City",
      location: "Porur, Chennai",
      priceRange: "₹78.0 L - ₹1.05 Cr",
      type: "2, 3, 4 BHK Apartments",
      image: "/Property4.jpeg",
    },
    {
      id: 5,
      developer: "TVS Sundaram Home Finance",
      name: "Sundaram Hills Estate",
      location: "Redhills, Chennai",
      priceRange: "₹45.0 L - ₹80.0 L",
      type: "Independent Houses",
      image: "/property5.jpeg",
    },
  ];

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 300;
    container.scrollTo({
      left: index * (cardWidth + 20),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % properties.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  return (
    <section className="py-6 px-4 md:px-8 bg-[var(--background)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Housing's top picks
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Explore top living options with us
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-4 -mx-2 px-2">
        {properties.map((property, idx) => (
          <button
            key={property.id}
            className={`text-sm whitespace-nowrap px-3 py-1 rounded-full border transition-all duration-300 shrink-0 ${
              idx === activeIndex
                ? "bg-white border-purple-600 text-purple-600 font-semibold shadow"
                : "bg-gray-100 text-gray-600 border-transparent"
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            {property.name}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="group relative overflow-hidden">
        {/* Pause/Play */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="absolute right-4 top-4 z-20 p-2 bg-white rounded-full shadow-md md:block hidden"
        >
          {isPaused ? <FaPlay className="text-gray-700" /> : <FaPause className="text-gray-700" />}
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-1 py-2"
        >
          {properties.map((property, idx) => (
            <div
              key={property.id}
              className={`w-[85vw] sm:w-[280px] md:w-[320px] lg:w-[340px] flex-shrink-0 transition-transform duration-300 ease-in-out rounded-xl shadow-md overflow-hidden ${
                idx === activeIndex
                  ? "border-4 border-purple-600 shadow-2xl scale-[1.02]"
                  : "border border-gray-200"
              }`}
            >
              <PropertyCard property={property} isActive={idx === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
