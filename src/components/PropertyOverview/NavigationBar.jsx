import React, { useEffect, useState, useRef } from "react";

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
          setActiveTab(entry.target.id);
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

  return (
    <div className="w-full bg-white border-y border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between overflow-x-auto whitespace-nowrap scrollbar-hide text-sm sm:text-base font-medium">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleScrollTo(tab.id)}
            className={`relative flex-1 min-w-[110px] text-center py-3 transition-all duration-200 ${
              activeTab === tab.id
                ? "text-purple-700 font-semibold"
                : "text-gray-700 hover:text-purple-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-purple-700 w-4/5 rounded transition-all duration-300"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
