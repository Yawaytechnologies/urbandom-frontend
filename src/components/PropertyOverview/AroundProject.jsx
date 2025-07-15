import React, { useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSchool,
  FaHospital,
  FaUtensils,
  FaShoppingBag,
  FaBus,
} from "react-icons/fa";

const data = [
  {
    type: "School",
    name: "Narayana E-Techno School, Sholinganallur",
    time: "3 mins",
    distance: "1 km",
    icon: <FaSchool className="text-xl text-purple-600" />,
  },
  {
    type: "Hospital",
    name: "Apollo Cradle & Children's Hospital Karapakkam",
    time: "4 mins",
    distance: "2.2 km",
    icon: <FaHospital className="text-xl text-purple-600" />,
  },
  {
    type: "Restaurant",
    name: "Guntur Gongura",
    time: "5 mins",
    distance: "3.1 km",
    icon: <FaUtensils className="text-xl text-purple-600" />,
  },
  {
    type: "Mall",
    name: "Saravana shopping mall",
    time: "6 mins",
    distance: "4.2 km",
    icon: <FaShoppingBag className="text-xl text-purple-600" />,
  },
  {
    type: "Bus Stand",
    name: "Mettukuppam Bus Stop",
    time: "6 mins",
    distance: "4.8 km",
    icon: <FaBus className="text-xl text-purple-600" />,
  },
];

export default function AroundProject() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    // Adjust scrollAmount based on the width of one card
    const scrollAmount = scrollRef.current ? scrollRef.current.children[0].offsetWidth : 0;

    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-4 py-6 bg-white rounded-xl">
      <p className="text-sm font-semibold text-gray-600 mb-2">
        Property Location
      </p>

      <div className="relative bg-gray-50 p-4 rounded-2xl overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Sholinganallur, Chennai South, Chennai
        </h2>

        {/* Scroll Buttons */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-100 animate-blink-slow"
          onClick={() => scroll("left")}
        >
          <FaArrowLeft className="text-purple-600" />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-100 animate-blink-slow"
          onClick={() => scroll("right")}
        >
          <FaArrowRight className="text-purple-600" />
        </button>

        {/* Card Slider without scrollbar */}
        <div
          ref={scrollRef}
          className="flex gap-4 px-2 sm:px-4 scroll-smooth"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className="w-full sm:min-w-[180px] md:min-w-[250px] lg:min-w-[300px] bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2 mb-1">
                {item.icon}
                <p className="text-sm font-bold text-purple-600">{item.type}</p>
              </div>
              <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                {item.name}
              </p>
              <div className="text-right mt-4 text-sm font-semibold text-gray-800">
                {item.time}
                <span className="text-xs text-gray-500 ml-1">
                  ({item.distance})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-indigo-600 font-medium cursor-pointer transition">
        View more on Maps
      </p>
    </div>
  );
}
