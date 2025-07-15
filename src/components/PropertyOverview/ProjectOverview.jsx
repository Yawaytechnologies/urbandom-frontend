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
    <div className="bg-white p-6 sm:p-8 rounded-xl ">
      {/* Title & Download */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          JK New Vision Township Overview
        </h2>
        <a
          href="#"
          className="text-sm text-purple-600 font-medium hover:underline mt-2 sm:mt-0"
        >
          📄 Download Brochure
        </a>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-gray-700 text-sm">
          <OverviewItem
            icon={<RiMapPinLine className="text-lg text-purple-700" />}
            label="Project Area"
            value="150 Acres"
          />
          <OverviewItem
            icon={<RiRuler2Line className="text-lg text-purple-700" />}
            label="Sizes"
            value="600 - 4042 sq.ft."
          />
          <OverviewItem
            icon={<RiBuilding2Line className="text-lg text-purple-700" />}
            label="Project Size"
            value="1500 units"
          />
          <OverviewItem
            icon={<RiCalendarCheckLine className="text-lg text-purple-700" />}
            label="Launch Date"
            value="Jan, 2015"
          />
          <OverviewItem
            icon={<RiMoneyRupeeCircleLine className="text-lg text-purple-700" />}
            label="Avg. Price"
            value="₹5.5 K/sq.ft"
          />
          <OverviewItem
            icon={<RiHomeSmileLine className="text-lg text-purple-700" />}
            label="Possession Status"
            value="Ready to Move"
            linkText="Home Construction Packages"
          />
          <OverviewItem
            icon={<RiBuilding2Line className="text-lg text-purple-700" />}
            label="Configuration"
            value="Residential Plots"
          />
          <OverviewItem
            icon={<RiVerifiedBadgeLine className="text-lg text-purple-700" />}
            label="RERA ID"
            value="TN/01/Layout/0416/2020"
            linkText="Check RERA Status"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-100 text-purple-600 font-medium hover:bg-purple-200">
          <RiShareForwardLine className="text-lg" /> Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-100 text-purple-600 font-medium hover:bg-purple-200">
          <RiHeart3Line className="text-lg" /> Save
        </button>
        <button className="px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700">
          Ask For Details
        </button>
      </div>
    </div>
  );
}

const OverviewItem = ({ icon, label, value, linkText }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 text-gray-500 font-medium">
      {icon}
      <span>{label}</span>
    </div>
    <div className="mt-1 font-semibold text-gray-800">
      {value}
      {linkText && (
        <a
          href="#"
          className="ml-1 text-sm text-purple-600 hover:underline block"
        >
          {linkText}
        </a>
      )}
    </div>
  </div>
);
