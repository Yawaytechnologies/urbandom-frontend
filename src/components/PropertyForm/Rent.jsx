import React, { useState } from "react";

// const areaUnits = ["sqft", "sqmt", "acre", "gaj", "cent", "hectare"];
// const constructionStatuses = ["ready-to-move", "under-construction"];

const RentForm = () => {
  const [form, setForm] = useState({
    title: "",
    propertyType: "",
    lookingTo: "rent",
    subProperty: "",
    location: "",
    builtUpArea: "",
    areaUnit: "",
    amenities: [],
    monthlyRent: "",
    availableDate: "",
    securityDeposit: "",
    constructionStatus: "",
    totalFloors: "",
    yourFloor: "",
    // Media fields:
    images: [],
    videos: [],
    documents: [],
  });

  // Add input handlers and field components here (not shown for brevity)

  return (
    <form className="w-full">
  <h2 className="text-3xl font-bold mb-8">Rent Property</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Title */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Title</label>
      <input
        className="border rounded px-4 py-2"
        placeholder="Property Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
    </div>
    {/* Property Type */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Property Type</label>
      <select
        className="border rounded px-4 py-2"
        value={form.propertyType}
        onChange={e => setForm({ ...form, propertyType: e.target.value })}
      >
        <option value="">Select Property Type</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>
    </div>
    {/* Monthly Rent */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Monthly Rent</label>
      <input
        type="number"
        className="border rounded px-4 py-2"
        placeholder="Monthly Rent"
        value={form.monthlyRent}
        onChange={e => setForm({ ...form, monthlyRent: e.target.value })}
      />
    </div>
    {/* Available Date */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Available Date</label>
      <input
        type="date"
        className="border rounded px-4 py-2"
        value={form.availableDate}
        onChange={e => setForm({ ...form, availableDate: e.target.value })}
      />
    </div>
    {/* Security Deposit */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Security Deposit</label>
      <input
        type="number"
        className="border rounded px-4 py-2"
        placeholder="Security Deposit"
        value={form.securityDeposit}
        onChange={e => setForm({ ...form, securityDeposit: e.target.value })}
      />
    </div>
    {/* Construction Status */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Construction Status</label>
      <select
        className="border rounded px-4 py-2"
        value={form.constructionStatus}
        onChange={e => setForm({ ...form, constructionStatus: e.target.value })}
      >
        <option value="">Select</option>
        <option value="ready-to-move">Ready to Move</option>
        <option value="under-construction">Under Construction</option>
      </select>
    </div>
    {/* Total Floors */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Total Floors</label>
      <input
        type="number"
        className="border rounded px-4 py-2"
        placeholder="Total Floors"
        value={form.totalFloors}
        onChange={e => setForm({ ...form, totalFloors: e.target.value })}
      />
    </div>
    {/* Your Floor */}
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Your Floor</label>
      <input
        type="number"
        className="border rounded px-4 py-2"
        placeholder="Your Floor"
        value={form.yourFloor}
        onChange={e => setForm({ ...form, yourFloor: e.target.value })}
      />
    </div>
  </div>
  <button
    type="submit"
    className="mt-8 px-8 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
  >
    Submit
  </button>
</form>

  );
};

export default RentForm;
