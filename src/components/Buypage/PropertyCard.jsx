// src/components/BuyPage/PropertyCard.jsx
import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[280px] flex-shrink-0">
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">{property.developer}</p>
        <h3 className="text-lg font-semibold mt-1">{property.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{property.location}</p>
        <p className="text-lg font-bold text-blue-600 mt-2">₹{property.priceRange}</p>
        <p className="text-sm text-gray-700 mt-1">{property.type}</p>
        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Contact
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;