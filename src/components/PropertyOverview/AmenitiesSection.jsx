import React from "react";
import { useSelector } from "react-redux";
import { iconMap, defaultAmenities } from "./amenitiesIconMap";

const AmenitiesSection = () => {
  const { data: propertyData } = useSelector((state) => state.overviewHome);
  const dynamicAmenities = Array.isArray(propertyData?.amenities)
    ? propertyData.amenities
    : [];

  const amenitiesToShow =
    dynamicAmenities.length > 0
      ? dynamicAmenities.map((label) => {
          const cleanLabel = label.trim();
          const lookupKey = cleanLabel.toLowerCase();
          const Icon = iconMap[lookupKey];
          return {
            label: cleanLabel, // Show original label (with original casing/spacing)
            Icon,
          };
        })
      : defaultAmenities;

  return (
    <div
      id="amenities"
      className="bg-white px-4 py-6 sm:px-6 md:px-8 rounded-xl shadow-md scroll-mt-[180px]"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Project Amenities
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-5 sm:gap-6">
        {amenitiesToShow.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-1 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-primary">
              {item.Icon ? (
                <item.Icon size={20} />
              ) : (
                <span className="text-sm bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                  {item.label?.charAt(0)}
                </span>
              )}
            </div>
            <div className="text-xs sm:text-sm text-gray-800">
              {item.label || "Unknown"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
