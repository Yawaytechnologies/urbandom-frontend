import React, { useEffect, useState, useRef } from "react";
import { useNavContext } from "./NavContext"; // Make sure the path is correct

const tabs = [
  { label: "Overview/Home", id: "overview-home" },
  { label: "Highlights", id: "highlights" },
  { label: "Amenities", id: "amenities" },
  { label: "Around This Project", id: "around" },
  { label: "More About Project", id: "more-about" },
  { label: "About Project", id: "about" },
  { label: "Property Map", id: "property-map" },
];

export default function NavigationBar() {
  const [activeTab, setActiveTab] = useState("");
  const observerRef = useRef(null);
  const tabRefs = useRef({});

  const { hideNavbar } = useNavContext(); // ← Get the hideNavbar flag from context

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveTab(id);

          const tabButton = tabRefs.current[id];
          if (tabButton && window.innerWidth < 1024) {
            tabButton.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          }
        }
      });
    }, observerOptions);

    tabs.forEach((tab) => {
      const section = document.getElementById(tab.id);
      if (section) observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  if (hideNavbar) return null; // ← Hide if flag is true

  return (
    <div className="w-full bg-white border-y border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 md:px-6 lg:px-10">
        <div className="flex overflow-x-auto lg:overflow-x-visible scrollbar-hide space-x-4 md:space-x-6 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              onClick={() => handleScrollTo(tab.id)}
              className={`relative shrink-0 px-3 md:px-4 py-2 text-sm md:text-base whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-purple-700 font-semibold"
                  : "text-gray-700 hover:text-purple-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-purple-700 w-4/5 rounded transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
