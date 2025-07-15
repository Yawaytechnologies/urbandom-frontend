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
} from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";

const amenities = [
  { icon: <FaBaby size={20} />, label: "Children's Play Area" },
  { icon: <FaSpa size={20} />, label: "Yoga / Meditation" },
  { icon: <FaRunning size={20} />, label: "Jogging Track" },
  { icon: <FaGamepad size={20} />, label: "Indoor Games" },
  { icon: <FaRoad size={20} />, label: "Paved Compound" },
  { icon: <FaBirthdayCake size={20} />, label: "Party Hall" },
  { icon: <FaArrowAltCircleUp size={20} />, label: "Lift(s)" },
  { icon: <FaPagelines size={20} />, label: "Landscaping & Trees" },
  { icon: <FaSolarPanel size={20} />, label: "Solar Power System" },
  { icon: <FaWater size={20} />, label: "Sewage Treatment" },
  { icon: <FaDumbbell size={20} />, label: "Gymnasium" },
  { icon: <TbBuildingSkyscraper size={20} />, label: "Clubhouse" },
];

const AmenitiesSection = () => {
  return (
    <div
      id="amenities"
      className="bg-white px-4 py-6 sm:px-6 md:px-8 rounded-xl shadow-md scroll-mt-[180px]"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Project Amenities
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-5 sm:gap-6">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-1 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-primary">{item.icon}</div>
            <div className="text-xs sm:text-sm text-gray-800">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
