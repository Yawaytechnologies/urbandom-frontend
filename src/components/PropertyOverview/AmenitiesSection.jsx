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
  { icon: <FaBaby size={24} />, label: "Children's Play Area" },
  { icon: <FaSpa size={24} />, label: "Yoga / Meditation" },
  { icon: <FaRunning size={24} />, label: "Jogging Track" },
  { icon: <FaGamepad size={24} />, label: "Indoor Games" },
  { icon: <FaRoad size={24} />, label: "Paved Compound" },
  { icon: <FaBirthdayCake size={24} />, label: "Party Hall" },
  { icon: <FaArrowAltCircleUp size={24} />, label: "Lift(s)" },
  { icon: <FaPagelines size={24} />, label: "Landscaping & Trees" },
  { icon: <FaSolarPanel size={24} />, label: "Solar Power System" },
  { icon: <FaWater size={24} />, label: "Sewage Treatment" },
  { icon: <FaDumbbell size={24} />, label: "Gymnasium" },
  { icon: <TbBuildingSkyscraper size={24} />, label: "Clubhouse" },
];

const AmenitiesSection = () => {
  return (
    <div
      id="amenities"
      className="bg-white p-6 rounded-xl shadow-md scroll-mt-[180px]"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Project Amenities
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-primary">{item.icon}</div>
            <div className="text-sm text-gray-800">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
