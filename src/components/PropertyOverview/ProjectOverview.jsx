import React from "react";
import {
  RiMapPinLine,
  RiRuler2Line,
  RiBuilding2Line,
  RiCalendarCheckLine,
  RiMoneyRupeeCircleLine,
  RiHomeSmileLine,
  RiVerifiedBadgeLine,
  RiShareForwardLine,
  RiHeart3Line,
} from "react-icons/ri";

export default function ProjectOverview() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl max-w-4xl mx-auto">
      {/* Title & Download */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          JK New Vision Township Overview
        </h2>
        <a
          href="#"
          className="text-xs sm:text-sm text-purple-600 font-medium hover:underline mt-2 sm:mt-0"
        >
          📄 Download Brochure
        </a>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-gray-700 text-xs sm:text-sm">
          <OverviewItem
            icon={<RiMapPinLine className="text-purple-700" />}
            label="Project Area"
            value="150 Acres"
          />
          <OverviewItem
            icon={<RiRuler2Line className="text-purple-700" />}
            label="Sizes"
            value="600 - 4042 sq.ft."
          />
          <OverviewItem
            icon={<RiBuilding2Line className="text-purple-700" />}
            label="Project Size"
            value="1500 units"
          />
          <OverviewItem
            icon={<RiCalendarCheckLine className="text-purple-700" />}
            label="Launch Date"
            value="Jan, 2015"
          />
          <OverviewItem
            icon={<RiMoneyRupeeCircleLine className="text-purple-700" />}
            label="Avg. Price"
            value="₹5.5 K/sq.ft"
          />
          <OverviewItem
            icon={<RiHomeSmileLine className="text-purple-700" />}
            label="Possession Status"
            value="Ready to Move"
            linkText="Home Construction Packages"
          />
          <OverviewItem
            icon={<RiBuilding2Line className="text-purple-700" />}
            label="Configuration"
            value="Residential Plots"
          />
          <OverviewItem
            icon={<RiVerifiedBadgeLine className="text-purple-700" />}
            label="RERA ID"
            value="TN/01/Layout/0416/2020"
            linkText="Check RERA Status"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        {/* Mobile: Vertical Stack, Desktop: Horizontal Row */}
        <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-600 text-xs font-medium rounded-md hover:bg-purple-200 transition w-full sm:w-auto">
          <RiShareForwardLine className="text-sm sm:text-base" /> Share
        </button>
        <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-600 text-xs font-medium rounded-md hover:bg-purple-200 transition w-full sm:w-auto">
          <RiHeart3Line className="text-sm sm:text-base" /> Save
        </button>
        <button className="px-4 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-md hover:bg-purple-700 transition w-full sm:w-auto">
          Ask For Details
        </button>
      </div>
    </div>
  );
}

const OverviewItem = ({ icon, label, value, linkText }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-1.5 text-gray-500 font-medium text-xs">
      {icon}
      <span>{label}</span>
    </div>
    <div className="mt-1 font-semibold text-gray-800 text-xs sm:text-sm">
      {value}
      {linkText && (
        <a
          href="#"
          className="ml-1 text-[10px] sm:text-xs text-purple-600 hover:underline block"
        >
          {linkText}
        </a>
      )}
    </div>
  </div>
);