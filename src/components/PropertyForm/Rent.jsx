import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPropertyAsync } from '../../redux/actions/propertyAction'; // Import action

import { MdBusiness, MdStoreMallDirectory, MdHomeWork } from "react-icons/md";

// 20 Amenities for demo
const amenitiesList = [
  { name: "Wi-Fi", icon: "📶" },
  { name: "AC", icon: "❄️" },
  { name: "TV", icon: "📺" },
  { name: "Fridge", icon: "🧊" },
  { name: "Washing Machine", icon: "🧺" },
  { name: "Lift", icon: "🛗" },
  { name: "Power Backup", icon: "⚡" },
  { name: "Parking", icon: "🅿️" },
  { name: "Security", icon: "🔒" },
  { name: "CCTV", icon: "🎥" },
  { name: "Fire Safety", icon: "🔥" },
  { name: "Water Supply", icon: "💧" },
  { name: "Intercom", icon: "📞" },
  { name: "Gym", icon: "🏋️" },
  { name: "Swimming Pool", icon: "🏊" },
  { name: "Garden", icon: "🌳" },
  { name: "Visitor Parking", icon: "🚗" },
  { name: "Rainwater Harvest", icon: "🌦️" },
  { name: "Solar Power", icon: "🌞" },
];

const commercialTypes = [
  { value: "office", label: "Office", icon: <MdBusiness size={18} /> },
  { value: "retailshop", label: "Retail Shop", icon: <MdStoreMallDirectory size={18} /> },
  { value: "showroom", label: "Showroom", icon: <MdHomeWork size={18} /> },
];

const RentForm = ({ lookingTo }) => {
const [form, setForm] = useState({
  title: "",
  propertyType: "residential",
  lookingTo: "rent", // Default value
  commercialSubType: "",
  country: "",
  state: "",
  district: "",
  locality: "",
  bhk: "",
  builtUpArea: "",
  areaUnit: "sqft",
  amenities: [],
  priceDetails: {
    monthlyRent: "", // Add monthlyRent inside priceDetails
    securityDeposit: "", // Add securityDeposit inside priceDetails
  },
  availableDate: "",
  images: [],
  videos: [],
  // Commercial only
  possessionStatus: "",
  commercialAvailableDate: "",
  locationHub: "",
  ownership: "",
  floorsAvailable: "",
  expectedRent: "",
});

  const dispatch = useDispatch();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSelectAmenities = (amenity) => {
    setForm((prevForm) => {
      const updatedAmenities = prevForm.amenities.includes(amenity)
        ? prevForm.amenities.filter((a) => a !== amenity)
        : [...prevForm.amenities, amenity];
      return { ...prevForm, amenities: updatedAmenities };
    });
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    setForm({ ...form, [type]: files });
  };

  // Handle Property Type Change
  const handlePropertyTypeChange = (type) => {
    setForm((prevForm) => {
      let lookingTo = 'rent'; // Default to 'rent'
      if (type === "sell") lookingTo = "sell";
      if (type === "pg-co-living") lookingTo = "pg-co-living";
      return {
        ...prevForm,
        propertyType: type,
        lookingTo, // Update the lookingTo field based on property type
        commercialSubType: type === "commercial" ? "" : prevForm.commercialSubType,
        bhk: type === "residential" ? "" : prevForm.bhk, // Clear BHK if switching to commercial
      };
    });
  };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('priceDetails')) {
      // Handle priceDetails fields
      setForm((prevForm) => ({
        ...prevForm,
        priceDetails: {
          ...prevForm.priceDetails,
          [name.split('.')[1]]: value,  // e.g., priceDetails.monthlyRent
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form state to ensure priceDetails is updated correctly
    console.log("Form Data being submitted:", form);
     const formData = {
    ...form,         // your form data
    lookingTo: lookingTo, // Ensure lookingTo is included here
  };
    dispatch(createPropertyAsync(form));  // Dispatch the async action with the form data
    setShowUploadModal(true);  // Show file upload modal
  };

  return (
    <form className="w-full px-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-tight">
        Rent Your Property
      </h2>

      {/* Property Title */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Property Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
          placeholder="Enter Property Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* Property Type Buttons */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Property Type</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex-1 rounded-lg px-4 py-2 border transition font-medium text-base ${
              form.propertyType === "residential"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-50 text-gray-800 border-gray-200"
            }`}
            onClick={() => setForm({ ...form, propertyType: "residential", commercialSubType: "" })}
          >
            Residential
          </button>
          <button
            type="button"
            className={`flex-1 rounded-lg px-4 py-2 border transition font-medium text-base ${
              form.propertyType === "commercial"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-50 text-gray-800 border-gray-200"
            }`}
            onClick={() => setForm({ ...form, propertyType: "commercial", bhk: "" })}
          >
            Commercial
          </button>
        </div>
      </div>

      {/* Commercial Subtype (with icons) */}
      {form.propertyType === "commercial" && (
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Commercial Type</label>
          <div className="flex gap-4">
            {commercialTypes.map((ct) => (
              <button
                key={ct.value}
                type="button"
                className={`flex items-center justify-center gap-2 flex-1 rounded-lg px-4 py-2 border transition font-medium text-base ${
                  form.commercialSubType === ct.value
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-50 text-gray-800 border-gray-200"
                }`}
                onClick={() => setForm({ ...form, commercialSubType: ct.value })}
              >
                {ct.icon} {ct.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Country</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">State</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          >
            <option value="">Select State</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="California">California</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">District</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          >
            <option value="">Select District</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Locality</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Locality"
            value={form.locality}
            onChange={(e) => setForm({ ...form, locality: e.target.value })}
          />
        </div>
      </div>

      {/* RESIDENTIAL */}
      {form.propertyType === "residential" && (
        <>
          {/* BHK */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">BHK</label>
            <div className="flex gap-4">
              {["1bhk", "2bhk", "3bhk", "4bhk+"].map((bhk) => (
                <button
                  key={bhk}
                  type="button"
                  className={`flex-1 rounded-lg px-4 py-2 border transition font-medium text-base ${
                    form.bhk === bhk
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-gray-50 text-gray-800 border-gray-200"
                  }`}
                  onClick={() => setForm({ ...form, bhk })}
                >
                  {bhk.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {/* Built-Up, Rent, Deposit, Available */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Built-Up Area</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="number"
                  className="flex-1 px-4 py-2 outline-none border-0 focus:ring-0"
                  placeholder="Area"
                  value={form.builtUpArea}
                  onChange={(e) => setForm({ ...form, builtUpArea: e.target.value })}
                />
                <select
                  className="h-full border-0 bg-transparent px-3 py-2 outline-none focus:ring-0"
                  value={form.areaUnit}
                  onChange={(e) => setForm({ ...form, areaUnit: e.target.value })}
                >
                  <option value="sqft">Sqft</option>
                  <option value="sqyd">Sq Yd</option>
                  <option value="sqmt">Sq Mt</option>
                </select>
              </div>
            </div>
                {/* Monthly Rent */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Monthly Rent</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
          placeholder="Enter Monthly Rent"
          value={form.priceDetails.monthlyRent}
          onChange={handleInputChange}
          name="priceDetails.monthlyRent"
        />
      </div>

      {/* Security Deposit */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Security Deposit</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
          placeholder="Enter Security Deposit"
          value={form.priceDetails.securityDeposit}
          onChange={handleInputChange}
          name="priceDetails.securityDeposit"
        />
      </div>
      <div className="mb-6">
  <label className="block mb-2 text-sm font-semibold text-gray-700">Ownership</label>
  <select
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
    value={form.ownership}
    onChange={(e) => setForm({ ...form, ownership: e.target.value })}
  >
    <option value="">Select Ownership</option>
    <option value="freehold">Freehold</option>
    <option value="leasehold">Leasehold</option>
    <option value="cooperative society">Cooperative Society</option>
    <option value="power of attorney">Power of Attorney</option>
  </select>
</div>


            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Available Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={form.availableDate}
                onChange={(e) => setForm({ ...form, availableDate: e.target.value })}
              />
            </div>
          </div>
        </>
      )}

      {/* COMMERCIAL */}
      {form.propertyType === "commercial" && (
        <>
          {/* Possession Status */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Possession Status</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 rounded-lg px-4 py-2 border transition font-medium text-base ${
                  form.possessionStatus === "ready"
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-50 text-gray-800 border-gray-200"
                }`}
                onClick={() => setForm({ ...form, possessionStatus: "ready" })}
              >
                Ready to Move
              </button>
              <button
                type="button"
                className={`flex-1 rounded-lg px-4 py-2 border transition font-medium text-base ${
                  form.possessionStatus === "under"
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-50 text-gray-800 border-gray-200"
                }`}
                onClick={() => setForm({ ...form, possessionStatus: "under" })}
              >
                Under Construction
              </button>
            </div>
            {form.possessionStatus === "under" && (
              <div className="mt-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">Available Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={form.commercialAvailableDate}
                  onChange={(e) => setForm({ ...form, commercialAvailableDate: e.target.value })}
                />
              </div>
            )}
          </div>
          {/* About the property */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Location Hub</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="IT Park, Business Park, Others"
                value={form.locationHub}
                onChange={(e) => setForm({ ...form, locationHub: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Built-Up Area</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Area"
                  value={form.builtUpArea}
                  onChange={(e) => setForm({ ...form, builtUpArea: e.target.value })}
                />
                <select
                  className="w-24 border border-gray-300 rounded-lg px-2"
                  value={form.areaUnit}
                  onChange={(e) => setForm({ ...form, areaUnit: e.target.value })}
                >
                  <option value="sqft">Sqft</option>
                  <option value="sqyd">Sq Yd</option>
                  <option value="sqmt">Sq Mt</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Ownership</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={form.ownership}
                onChange={(e) => setForm({ ...form, ownership: e.target.value })}
              >
                <option value="">Select Ownership</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="cooperative">Cooperative Society</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Total Floors</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="No. of Floors"
                value={form.floorsAvailable}
                onChange={(e) => setForm({ ...form, floorsAvailable: e.target.value })}
              />
            </div>
          </div>
          {/* Price */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Expected Rent (Financials)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="₹ / month"
              value={form.expectedRent}
              onChange={(e) => setForm({ ...form, expectedRent: e.target.value })}
            />
          </div>
        </>
      )}

      {/* Amenities */}
      <div className="mb-10">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity.name}
              type="button"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition font-medium ${
                form.amenities.includes(amenity.name)
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-gray-50 text-gray-800 border-gray-300"
              }`}
              onClick={() => handleSelectAmenities(amenity.name)}
            >
              <span>{amenity.icon}</span>
              <span>{amenity.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full md:w-1/2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg"
        >
          Submit Property
        </button>
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Upload Property Images & Videos</h3>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Photos</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                multiple
                onChange={(e) => handleFileChange(e, "images")}
              />
            </div>

            {/* Video Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Videos</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                multiple
                onChange={(e) => handleFileChange(e, "videos")}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowUploadModal(false)}
              >
                Confirm Uploads
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default RentForm;
