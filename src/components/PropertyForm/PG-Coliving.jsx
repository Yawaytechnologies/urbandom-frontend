import React, { useState } from "react";

const PGCoLivingForm = () => {
  const [totalBeds, setTotalBeds] = useState("");
  const [bestSuitedFor, setBestSuitedFor] = useState("");
  const [mealsAvailable, setMealsAvailable] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [rooms, setRooms] = useState([{ roomType: "", rent: "", security: "" }]);

  const handleSubmit = () => {
    // Submit the form
    console.log({ totalBeds, bestSuitedFor, mealsAvailable, noticePeriod, rooms });
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">PG/Co-living Property Form</h3>

      {/* Total Beds */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Total Beds</label>
        <input
          type="number"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter total beds"
          value={totalBeds}
          onChange={(e) => setTotalBeds(e.target.value)}
        />
      </div>

      {/* Best Suited For */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Best Suited For</label>
        <select
          className="w-full border px-4 py-2 rounded-md"
          value={bestSuitedFor}
          onChange={(e) => setBestSuitedFor(e.target.value)}
        >
          <option value="Students">Students</option>
          <option value="Professionals">Professionals</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* Meals Available */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Meals Available</label>
        <select
          className="w-full border px-4 py-2 rounded-md"
          value={mealsAvailable}
          onChange={(e) => setMealsAvailable(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
 {/* Notice Period */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Notice Period</label>
        <input
          type="text"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter notice period"
          value={noticePeriod}
          onChange={(e) => setNoticePeriod(e.target.value)}
        />
      </div>

      {/* Rooms */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Room Details</h4>
        {rooms.map((room, idx) => (
          <div key={idx} className="mb-4">
            <label className="block text-sm font-semibold mb-2">Room Type</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter room type"
              value={room.roomType}
              onChange={(e) => {
                const updatedRooms = [...rooms];
                updatedRooms[idx].roomType = e.target.value;
                setRooms(updatedRooms);
              }}
            />
            <label className="block text-sm font-semibold mb-2 mt-2">Rent</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter room rent"
              value={room.rent}
              onChange={(e) => {
                const updatedRooms = [...rooms];
                updatedRooms[idx].rent = e.target.value;
                setRooms(updatedRooms);
              }}
            />
            <label className="block text-sm font-semibold mb-2 mt-2">Security</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter security"
              value={room.security}
              onChange={(e) => {
                const updatedRooms = [...rooms];
                updatedRooms[idx].security = e.target.value;
                setRooms(updatedRooms);
              }}
            />
          </div>
        ))}
      </div>
{/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default PGCoLivingForm;
