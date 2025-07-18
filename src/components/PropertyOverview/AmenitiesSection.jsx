import React from "react";
import {
  FaBaby,
  FaSpa,
  FaRunning,
  FaGamepad,
  FaRoad,
  FaBirthdayCake,
  FaArrowAltCircleUp,
  FaPagelines,
  FaSolarPanel,
  FaWater,
  FaDumbbell,
  FaTv,
  FaWifi,
  FaSnowflake,
  FaCarBattery,
  FaShower,
  FaCouch,
  FaFan,
  FaDoorClosed,
  FaRegBuilding,
  FaLock,
  FaCamera,
  FaPhone,
  FaParking,
  FaSwimmingPool,
  FaUmbrellaBeach,
  FaPlug,
  FaTree,
} from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { useSelector } from "react-redux";

// Icon mapping based on known amenity labels
export const iconMap = {
  "Children's Play Area": <FaBaby size={20} />,
  "Yoga / Meditation": <FaSpa size={20} />,
  "Jogging Track": <FaRunning size={20} />,
  "Indoor Games": <FaGamepad size={20} />,
  "Paved Compound": <FaRoad size={20} />,
  "Party Hall": <FaBirthdayCake size={20} />,
  "Lift": <FaArrowAltCircleUp size={20} />,
  "Lift(s)": <FaArrowAltCircleUp size={20} />,
  "Landscaping & Trees": <FaPagelines size={20} />,
  "Solar Power System": <FaSolarPanel size={20} />,
  "Solar Power": <FaSolarPanel size={20} />,
  "Sewage Treatment": <FaWater size={20} />,
  "24x7 Water": <FaWater size={20} />,
  "Water Supply": <FaWater size={20} />,
  "Parking": <FaParking size={20} />,
  "Visitor Parking": <FaParking size={20} />,
  "Gymnasium": <FaDumbbell size={20} />,
  "Gym": <FaDumbbell size={20} />,
  "Clubhouse": <FaRegBuilding size={20} />,
  "TV": <FaTv size={20} />,
  "Wi-Fi": <FaWifi size={20} />,
  "AC": <FaSnowflake size={20} />,
  "Fridge": <FaCarBattery size={20} />,
  "Washing Machine": <FaShower size={20} />,
  "Power Backup": <FaPlug size={20} />,
  "Security": <FaLock size={20} />,
  "Fire Safety": <FaUmbrellaBeach size={20} />,
  "Garden": <FaTree size={20} />,
  "Swimming Pool": <FaSwimmingPool size={20} />,
  "CCTV": <FaCamera size={20} />,
  "Intercom": <FaPhone size={20} />,
  "Rainwater Harvest": <FaWater size={20} />,
  "Covered Parking": <FaCarBattery size={20} />,
  "Covered Car Parking": <FaCarBattery size={20} />,
};

// Default static list (when no API amenities available)
const defaultAmenities = Object.entries(iconMap).map(([label, icon]) => ({
  label,
  icon,
}));

const AmenitiesSection = () => {
  const { data: propertyData } = useSelector((state) => state.overviewHome);
  const dynamicAmenities = Array.isArray(propertyData?.amenities)
    ? propertyData.amenities
    : [];

  const amenitiesToShow =
    dynamicAmenities.length > 0
      ? dynamicAmenities.map((label) => {
          const cleanLabel = label.trim();
          return {
            label: cleanLabel,
            icon: iconMap[cleanLabel] || null,
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
              {item.icon || (
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
