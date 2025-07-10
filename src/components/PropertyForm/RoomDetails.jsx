import React from "react";

// For non-PG
const bhkOptions = ["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "3+ BHK"];
const areaUnits = ["sq.ft", "sq.m", "acres"];
const furnishTypes = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

// For PG
const roomTypes = [
  "Private Room",
  "Double Sharing",
  "Triple Sharing",
  "3+ Sharing",
];

const RoomDetails = ({
  // Common
  onBack,
  onNext,
  // For regular
  pgMode = false,        // <-- pass true for PG/Co-living mode
  bhk, setBhk,
  area, setArea,
  areaUnit, setAreaUnit,
  furnishType, setFurnishType,
  shareWithAgents, setShareWithAgents,
  // For PG
  rooms, setRooms,
  onSubmit, // for PG post property
}) => {
  // ---- PG Room Mode ----
  if (pgMode) {
    // Handlers
    const handleRoomChange = (idx, field, value) => {
      const updated = rooms.map((room, i) =>
        i === idx ? { ...room, [field]: value } : room
      );
      setRooms(updated);
    };

    const addRoom = () => setRooms([
      ...rooms, { roomType: "", rent: "", security: "" }
    ]);
    const deleteRoom = idx => {
      if (rooms.length === 1) return;
      setRooms(rooms.filter((_, i) => i !== idx));
    };

    const canSubmit = rooms.every(
      r => r.roomType && r.rent && r.security
    );

    return (
      <div>
        <h2 className="text-lg font-bold mb-6">ROOM DETAILS</h2>
        {rooms.map((room, idx) => (
          <div key={idx} className="bg-gray-50 border rounded-xl mb-6 px-4 py-4 relative">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">Room {idx + 1}</div>
              {rooms.length > 1 && (
                <button
                  className="text-[#7c3aed] font-medium hover:underline"
                  onClick={() => deleteRoom(idx)}
                  type="button"
                >Delete</button>
              )}
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Room Type <span className="text-red-500">*</span></div>
              <div className="flex gap-3 flex-wrap">
                {roomTypes.map(type => (
                  <button
                    key={type}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium
                      ${room.roomType === type
                        ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}
                    onClick={() => handleRoomChange(idx, "roomType", type)}
                    type="button"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Rent <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
                placeholder="Enter rent"
                value={room.rent}
                onChange={e => handleRoomChange(idx, "rent", e.target.value)}
                min={0}
              />
            </div>
            <div className="">
              <label className="block text-gray-700 font-semibold mb-2">
                Security Deposit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
                placeholder="Enter security deposit"
                value={room.security}
                onChange={e => handleRoomChange(idx, "security", e.target.value)}
                min={0}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-center mb-8">
          <button
            className="border-2 border-[#43cea2] text-[#22c55e] rounded-lg px-6 py-2 font-bold hover:bg-[#eafff5] transition-all"
            onClick={addRoom}
            type="button"
          >
            + Add Another Room
          </button>
        </div>
        <div className="flex justify-between">
          <button
            className="py-2 px-6 rounded-lg font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
            type="button"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className={`py-2 px-6 rounded-lg font-bold shadow transition-all
              ${canSubmit
                ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
            disabled={!canSubmit}
            onClick={onSubmit}
            type="button"
          >
            Post Property
          </button>
        </div>
      </div>
    );
  }

  // ---- Regular Room Mode ----
  const canProceed = bhk && area && areaUnit && furnishType;

  return (
    <>
      <div className="mb-8">
        <label className="block mb-2 text-gray-700 font-semibold">Select BHK</label>
        <div className="flex gap-3">
          {bhkOptions.map(option => (
            <button
              key={option}
              type="button"
              className={`px-5 py-2 rounded-xl border font-medium text-sm
                ${bhk === option
                  ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}
              onClick={() => setBhk(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 font-semibold">Built Up Area</label>
          <input
            type="number"
            min={0}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg text-base focus:ring-2 focus:ring-[#4338ca]"
            placeholder="Enter area"
            value={area}
            onChange={e => setArea(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 font-semibold">Select Area Unit</label>
          <select
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg text-base focus:ring-2 focus:ring-[#4338ca]"
            value={areaUnit}
            onChange={e => setAreaUnit(e.target.value)}
          >
            <option value="">Select</option>
            {areaUnits.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-8">
        <label className="block mb-2 text-gray-700 font-semibold">Furnish Type</label>
        <div className="flex gap-3">
          {furnishTypes.map(type => (
            <button
              key={type}
              type="button"
              className={`px-5 py-2 rounded-xl border font-medium text-sm
                ${furnishType === type
                  ? "bg-[#c3f7eb] text-[#059669] border-[#059669] font-bold shadow"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}
              onClick={() => setFurnishType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <a href="#" className="text-[#4338ca] font-medium text-sm hover:underline">
          + Add Furnishings / Amenities
        </a>
      </div>
      <div className="mb-8">
        <label className="inline-flex items-center text-gray-700 font-medium text-sm">
          <input
            type="checkbox"
            checked={shareWithAgents}
            onChange={e => setShareWithAgents(e.target.checked)}
            className="mr-2"
          />
          Share listing information with agents
        </label>
      </div>
      <div className="flex justify-between">
        <button
          className="py-2 px-6 rounded-lg font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
          type="button"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className={`py-2 px-6 rounded-lg font-bold shadow transition-all
            ${canProceed
              ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          disabled={!canProceed}
          type="button"
          onClick={onNext}
        >
          Next, add price details
        </button>
      </div>
    </>
  );
};

export default RoomDetails;
