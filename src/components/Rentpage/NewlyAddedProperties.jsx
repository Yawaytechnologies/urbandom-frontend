import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewlyAddedProperties } from "../../redux/actions/rentPageAction";

const NewlyAddedProperties = () => {
  const containerRef = useRef(null);

  const [, setScrollPercent] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { newlyAddedProperties, loading, error } = useSelector(
    (state) => state.rentPage
  );

  useEffect(() => {
    dispatch(fetchNewlyAddedProperties());
  }, [dispatch]);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = el.scrollLeft;

    setScrollPercent(max > 0 ? Math.min(100, (left / max) * 100) : 0);
    setCanScrollLeft(left > 0);
    setCanScrollRight(left < max - 1);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({ left: 0, behavior: "auto" });
    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, newlyAddedProperties?.length]);

  const getScrollAmount = () => {
    const el = containerRef.current;
    if (!el) return 300;
    const first = el.querySelector("[data-card]");
    if (!first) return 300;
    const rect = first.getBoundingClientRect();
    return Math.round(rect.width + 24); // gap-6 ~ 24px
  };

  const handleScrollLeft = () => {
    const amount = getScrollAmount();
    containerRef.current?.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    const amount = getScrollAmount();
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property-overview/${propertyId}`);
  };

  return (
    <section className="relative py-10 px-4 md:px-8 bg-[var(--background)] overflow-hidden">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
          Newly Added Properties
        </h2>
        <h5 className="text-lg text-center md:text-base mt-1 text-[var(--text-secondary)]">
          Recently listed homes you might like
        </h5>
      </div>

      <div className="group relative">
        {/* edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--background, #fff) 30%, rgba(255,255,255,0) 100%)",
            opacity: canScrollLeft ? 0 : 0,
           
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{
            background:
              "linear-gradient(270deg, var(--background, #fff) 30%, rgba(255,255,255,0) 100%)",
            opacity: canScrollRight ? 0 : 0,
            
          }}
        />

        {/* LEFT ARROW – premium style */}
        <button
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
          className={`absolute left-2 top-[42%] -translate-y-1/2 z-20
                      h-12 w-12 rounded-full cursor-pointer
                      bg-white/95 backdrop-blur
                      shadow-[0_6px_18px_rgba(0,0,0,.15)]
                      ring-2 ring-[var(--accent)]/70
                      flex items-center justify-center
                      transition-all duration-200
                      ${canScrollLeft ? "opacity-100 hover:scale-105 active:scale-95" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll Left"
        >
          <MdChevronLeft size={28} aria-hidden="true" />
        </button>

        {/* scroller */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-2 snap-x snap-mandatory scrollbar-hide justify-start"
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-900">Error: {error}</p>
          ) : newlyAddedProperties?.length > 0 ? (
            newlyAddedProperties.map((property, idx) => (
              <div
                data-card
                key={property._id || idx}
                className="flex flex-col justify-between bg-white border border-gray-200 rounded-xl shadow-md 
                           hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 
                           min-w-[270px] max-w-[270px] sm:min-w-[320px] sm:max-w-[320px] h-[500px] flex-shrink-0 snap-start"
              >
                {/* IMAGE — clearer, taller, no overlay under arrows */}
                <div className="relative w-full h-[240px] bg-gray-100 rounded-t-xl overflow-hidden">
                  {property?.media?.images?.[0] ? (
                    <img
                      src={
                        typeof property.media.images[0] === "string"
                          ? property.media.images[0]
                          : property.media.images[0].url || ""
                      }
                      alt={property.title || "Property"}
                      loading={idx < 2 ? "eager" : "lazy"}
                      fetchPriority={idx < 2 ? "high" : "auto"}
                      decoding="async"
                      sizes="(min-width:1024px) 320px, 270px"
                      className="w-full h-full object-cover select-none"
                      style={{ transform: "translateZ(0)" }} // helps crispness on some GPUs
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='240'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='16'>Image unavailable</text></svg>`
                          );
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-center text-[var(--text-secondary)] mb-1 truncate capitalize">
                    {property.title || "Unnamed Property"}
                  </h3>

                  <p className="text-md text-center text-gray-500 truncate capitalize">
                    {property.lookingTo || "Developer not specified"}
                  </p>

                  <hr className="border-t border-gray-200 my-3" />

                  <p className="text-center font-bold text-[var(--accent)] mb-3">
                    {property?.priceDetails?.monthlyRent
                      ? `₹${property.priceDetails.monthlyRent}`
                      : "Price not available"}
                  </p>

                  <div className="flex flex-col items-start gap-1 text-md text-blue-600 mb-3">
                    <div className="flex items-center gap-2">
                      <FaBed className="text-black" />
                      <span className="capitalize">
                        {property.propertyType || "Property type not specified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-black" />
                      <span className="capitalize">
                        {property?.location?.name || "Location Not Specified"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(property._id)}
                    className="w-full bg-[var(--accent)] text-white py-2 rounded-md 
                               hover:bg-opacity-90 transition font-medium text-sm cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No newly added Properties found.</p>
          )}
        </div>

        {/* RIGHT ARROW – premium style */}
        <button
          onClick={handleScrollRight}
          disabled={!canScrollRight}
          className={`absolute right-2 top-[42%] -translate-y-1/2 z-20
                      h-12 w-12 rounded-full cursor-pointer
                      bg-white/95 backdrop-blur
                      shadow-[0_6px_18px_rgba(0,0,0,.15)]
                      ring-2 ring-[var(--accent)]/70
                      flex items-center justify-center
                      transition-all duration-200
                      ${canScrollRight ? "opacity-100 hover:scale-105 active:scale-95" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll Right"
        >
          <MdChevronRight size={28} aria-hidden="true" />
        </button>
      </div>

      
    </section>
  );
};

export default NewlyAddedProperties;
