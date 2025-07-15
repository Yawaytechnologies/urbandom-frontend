import React, { useState } from "react";

const SellForm = () => {
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [furnishType, setFurnishType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Submit the form
    console.log({ price, propertyType, area, location, furnishType, description });
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Sell Property Form</h3>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Price</label>
        <input
          type="number"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Property Type */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Property Type</label>
        <select
          className="w-full border px-4 py-2 rounded-md"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
        </select>
      </div>

      {/* Area */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Area (sq ft)</label>
        <input
          type="number"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Location</label>
        <input
          type="text"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Furnish Type */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Furnish Type</label>
        <select
          className="w-full border px-4 py-2 rounded-md"
          value={furnishType}
          onChange={(e) => setFurnishType(e.target.value)}
        >
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Describe the property"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SellForm;
