import React, { useState } from "react";

// Dummy amenities data (replace with actual icons)
const amenitiesList = [
  { name: "Wi-Fi", icon: "📶" },
  { name: "AC", icon: "❄️" },
  { name: "TV", icon: "📺" },
  { name: "Fridge", icon: "🧊" },
  { name: "Washing Machine", icon: "🧺" },
  { name: "Power Backup", icon: "🔋" },
  { name: "Lift", icon: "🛗" },
  { name: "Parking", icon: "🚗" },
  { name: "Security", icon: "🔐" },
  { name: "Water Supply", icon: "💧" },
];

const PGCoLivingForm = () => {
  const [form, setForm] = useState({
    pgName: "",
    country: "",
    state: "",
    district: "",
    locality: "",
    totalBeds: "",
    pgFor: "boys", // Default
    bestSuitedFor: "students", // Default
    mealsAvailable: "yes", // Default
    noticePeriod: "",
    lockInPeriod: "",
    amenities: [],
    rooms: [{ roomNumber: "", beds: "", capacity: "" }],
    images: [],
    videos: [],
  });

  const handleSelectAmenities = (amenity) => {
    setForm((prevForm) => {
      const updatedAmenities = prevForm.amenities.includes(amenity)
        ? prevForm.amenities.filter((a) => a !== amenity)
        : [...prevForm.amenities, amenity];
      return { ...prevForm, amenities: updatedAmenities };
    });
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...form.rooms];
    updatedRooms[index][field] = value;
    setForm({ ...form, rooms: updatedRooms });
  };

  const addRoom = () => {
    setForm({
      ...form,
      rooms: [...form.rooms, { roomNumber: "", beds: "", capacity: "" }],
    });
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (type === "images") {
      setForm({ ...form, images: files });
    } else if (type === "videos") {
      setForm({ ...form, videos: files });
    }
  };

  return (
    <form className="w-full  p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        PG/Co-living Details
      </h2>

      {/* PG Name */}
      <div className="flex flex-col mb-6">
        <label className="mb-2 text-sm font-medium text-gray-700">PG Name</label>
        <input
          type="text"
          className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter PG Name"
          value={form.pgName}
          onChange={(e) => setForm({ ...form, pgName: e.target.value })}
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Country</label>
          <select
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">State</label>
          <select
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          >
            <option value="">Select State</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="California">California</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">District</label>
          <select
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          >
            <option value="">Select District</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Locality</label>
          <input
            type="text"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Locality"
            value={form.locality}
            onChange={(e) => setForm({ ...form, locality: e.target.value })}
          />
        </div>
      </div>

      {/* PG Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Total Beds</label>
          <input
            type="number"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Total Beds"
            value={form.totalBeds}
            onChange={(e) => setForm({ ...form, totalBeds: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">PG is For</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`${
                form.pgFor === "boys" ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => setForm({ ...form, pgFor: "boys" })}
            >
              Boys
            </button>
            <button
              type="button"
              className={`${
                form.pgFor === "girls" ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => setForm({ ...form, pgFor: "girls" })}
            >
              Girls
            </button>
          </div>
        </div>
      </div>

      {/* Best Suited For & Meals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Best Suited For</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`${
                form.bestSuitedFor === "students" ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => setForm({ ...form, bestSuitedFor: "students" })}
            >
              Students
            </button>
            <button
              type="button"
              className={`${
                form.bestSuitedFor === "professionals" ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => setForm({ ...form, bestSuitedFor: "professionals" })}
            >
              Professionals
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Meals Available</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`${
                form.mealsAvailable === "yes" ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => setForm({ ...form, mealsAvailable: "yes" })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`${
                form.mealsAvailable === "no" ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => setForm({ ...form, mealsAvailable: "no" })}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* Notice & Lock-in Period */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Notice Period</label>
          <input
            type="number"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Notice Period"
            value={form.noticePeriod}
            onChange={(e) => setForm({ ...form, noticePeriod: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Lock-in Period</label>
          <input
            type="number"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Lock-in Period"
            value={form.lockInPeriod}
            onChange={(e) => setForm({ ...form, lockInPeriod: e.target.value })}
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-col mb-6">
        <label className="mb-2 text-sm font-medium text-gray-700">Amenities</label>
        <div className="grid grid-cols-3 gap-4">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity.name}
              type="button"
              className={`${
                form.amenities.includes(amenity.name) ? "bg-blue-500 text-white" : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handleSelectAmenities(amenity.name)}
            >
              {amenity.icon} {amenity.name}
            </button>
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Room Details</h3>
        {form.rooms.map((room, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Room Number</label>
              <input
                type="text"
                className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter Room Number"
                value={room.roomNumber}
                onChange={(e) => handleRoomChange(index, "roomNumber", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Beds</label>
              <input
                type="number"
                className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter Number of Beds"
                value={room.beds}
                onChange={(e) => handleRoomChange(index, "beds", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter Room Capacity"
                value={room.capacity}
                onChange={(e) => handleRoomChange(index, "capacity", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={addRoom}
        >
          Add Room
        </button>
      </div>

      {/* Photo & Video Upload */}
      <div className="flex flex-col mb-6">
        <label className="mb-2 text-sm font-medium text-gray-700">Upload Photos</label>
        <input
          type="file"
          className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          multiple
          onChange={(e) => handleFileChange(e, "images")}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label className="mb-2 text-sm font-medium text-gray-700">Upload Videos</label>
        <input
          type="file"
          className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          multiple
          onChange={(e) => handleFileChange(e, "videos")}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full md:w-1/2 mt-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Submit PG
        </button>
      </div>
    </form>
  );
};

export default PGCoLivingForm;
