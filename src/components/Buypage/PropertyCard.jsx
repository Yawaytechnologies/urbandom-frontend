import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full min-h-[420px]">
      {/* Image Background */}
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${property.image})` }}
      />

      {/* Details */}
      <div className="flex flex-col flex-grow px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{property.name}</h3>
        <p className="text-sm text-gray-500 truncate">{property.developer}</p>

        <div className="mt-3 text-sm text-gray-600">
          <p className="flex items-center gap-1 mb-1">🛏️ {property.type}</p>
          <p className="flex items-center gap-1">📍 {property.location}</p>
        </div>

        <p className="mt-3 font-bold text-[var(--accent)]">{property.priceRange}</p>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button className="w-full bg-[var(--accent)] text-white rounded-md py-2 text-sm hover:brightness-110 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
