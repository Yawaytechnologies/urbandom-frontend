import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const pgList = [
  {
    name: "Amma Kudil PG",
    price: "₹7,499",
    location: "Shanthi Colony",
    types: ["Multi Sharing", "Double Sharing", "Triple Sharing"],
    image: "/download.jpg",
    initial: "B",
  },
  {
    name: "Shree Sai Kishore",
    price: "₹4,000",
    location: "Madipakkam",
    types: ["Double Sharing", "Triple Sharing", "Single Room"],
    image: "/download1.jpg",
    initial: "S",
  },
  {
    name: "SS Mansion",
    price: "₹3,700",
    location: "Kamaraj Nagar",
    types: ["Multi Sharing", "Double Sharing"],
    image: "/download2.jpg",
    initial: "A",
  },
  {
    name: "PG Neelankarai",
    price: "₹8,000",
    location: "Saraswathi Nagar",
    types: ["Double Sharing", "Single Room"],
    image: "/download3.jpg",
    initial: "T",
  },
];

const TopPGSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-15 px-8 relative max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Our Top <span className="font-bold">Neighbourhood PGs</span>
      </h2>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
        <button
          ref={prevRef}
          className="w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
        <button
          ref={nextRef}
          className="w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
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
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {pgList.map((pg, idx) => (
          <SwiperSlide key={idx}>
            <a href="#" className="block">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-full hover:shadow-md transition min-h-[320px]">
                {pg.image ? (
                  <img
                    src={pg.image}
                    alt={pg.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-4xl text-gray-400">
                    {pg.initial}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {pg.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700">
                      {pg.price}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{pg.location}</p>
                  <p className="text-[10px] text-gray-600 mt-2">
                    🛏 {pg.types.join(" , ")}
                  </p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopPGSlider;
