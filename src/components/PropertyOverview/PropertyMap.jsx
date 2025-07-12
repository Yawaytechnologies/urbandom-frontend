import React from "react";

const PropertyMap = () => {
  return (
    <section className="mb-12 bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Location Map</h2>
      {/* You can embed a map here using an API like Google Maps */}
      <div className="h-72 bg-gray-300 rounded-lg overflow-hidden relative">
        {/* Placeholder or embedded map */}
        <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-600">
          Map Placeholder
        </div>
      </div>
    </section>
  );
};

export default PropertyMap;
