import React, { useState } from "react";

export default function AboutProject() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-[#f8f8f8] rounded-xl p-6 w-full transition-all duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        More About JK New Vision Township
      </h2>

      <p className="text-gray-700 text-sm mb-4">
        JK New Vision Township is the "Chennai's Biggest Residential Township"
        by JK Groups. This plot is available for sale in Vengambakkam, Chennai.
        This project offers plots in various sizes. The minimum plot size is 800 sq.ft.
        and the maximum size is 3000 sq.ft. There are 458 units in JK New Vision Township.
        The address of JK New Vision Township is East Tambaram, Vengambakkam.
      </p>

      {expanded && (
        <>
          <p className="text-gray-700 text-sm mb-4">
            JK New Vision Township ensures a coveted lifestyle and offers a convenient living.
            There is 24×7 Security. It is a Gated Community. Other provisions include access to
            Community Hall, Landscaping & Tree Planting, Storm Water Drains, and a Shopping Mall.
          </p>

          <p className="text-gray-700 text-sm mb-4">
            Vengambakkam is well-connected to other parts of the city by road, which passes through
            the heart of this suburb. Prominent shopping malls, movie theatres, schools, and hospitals
            are present in proximity of this residential project.
          </p>

          <h3 className="font-semibold text-gray-800 mt-6 mb-2">📍 Location Highlights</h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>800 mts from Vandalur – Kelambakkam road</li>
            <li>10 Mins from Kilambakkam New Bus Terminal</li>
            <li>15 Mins from Tambaram Railway Station</li>
            <li>10 Mins from upcoming Metro station</li>
            <li>30 Mins from Airport</li>
            <li>Surrounded by reputed schools and colleges like VIT, Cresent, ZION, SSM school</li>
            <li>
              10 to 30 Mins drive from major IT parks like Shriram Gateway, MEPZ, Siruseri IT Park,
              ELCOT SEZ, ZOHO, and Mahindra World City
            </li>
            <li>25 Mins from Oragadam Industrial Park (India's largest automobile hub)</li>
          </ul>
        </>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#5d3bee] text-sm font-medium focus:outline-none"
        >
          {expanded ? "Show Less About Project ︿" : "Show More About Project ﹀"}
        </button>
      </div>
    </section>
  );
}
