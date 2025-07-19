import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/actions/countryactions";
import { fetchStatesByCountry } from "../../redux/actions/stateActions";
import { fetchDistrictsByState } from "../../redux/actions/districtActions";
import { createPropertyAsync } from "../../redux/actions/propertyAction";
import { MdBusiness, MdStoreMallDirectory, MdHomeWork } from "react-icons/md";

// Amenities
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
  { name: "Maintenance Staff", icon: "🧑‍🔧" },
];

const commercialTypes = [
  { value: "office", label: "Office", icon: <MdBusiness size={18} /> },
  { value: "retailshop", label: "Retail Shop", icon: <MdStoreMallDirectory size={18} /> },
  { value: "showroom", label: "Showroom", icon: <MdHomeWork size={18} /> },
];

const SellForm = (lookingTo) => {
  const [form, setForm] = useState({
    title: "",
    propertyType: "residential",
    commercialSubType: "",
    country: "",
    lookingTo:"sell",
    state: "",
    district: "",
    locality: "",
    bhk: "",
    builtUpArea: "",
    areaUnit: "sqft",
    amenities: [],
    cost: "",
    priceDetails: { amount: 123456 },
    images: [],
    videos: [],
    // Commercial only:
    possessionStatus: "",
    commercialAvailableDate: "",
    locationHub: "",
    ownership: "",
    floorsAvailable: "",
    expectedPrice: "",
  });

  // REDUX: Dynamic location state
  const dispatch = useDispatch();
  const { countries, loading: loadingCountries } = useSelector(state => state.countries);
  const { states, loading: loadingStates } = useSelector(state => state.states);
  const { districts, loading: loadingDistricts } = useSelector(state => state.districts);

  // Fetch countries when form loads
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // Fetch states when country changes
  useEffect(() => {
    if (form.country) {
      dispatch(fetchStatesByCountry(form.country));
      setForm(f => ({ ...f, state: "", district: "" })); // reset state & district
    }
  }, [form.country, dispatch]);

  // Fetch districts when state changes
  useEffect(() => {
    if (form.state) {
      dispatch(fetchDistrictsByState(form.state));
      setForm(f => ({ ...f, district: "" })); // reset district
    }
  }, [form.state, dispatch]);

  // Amenities
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

  // Submit handler (dispatches createPropertyAsync)
const handleSubmit = (e) => {
  e.preventDefault();
  // Prepare data (convert cost/price fields to number if needed)
  const formData = {
    ...form,
    cost: form.cost ? Number(form.cost) : undefined,
    expectedPrice: form.expectedPrice ? Number(form.expectedPrice) : undefined,
    builtUpArea: form.builtUpArea ? Number(form.builtUpArea) : undefined,
    floorsAvailable: form.floorsAvailable ? Number(form.floorsAvailable) : undefined,
  };

  // Remove any fields with an empty string (including ownership)
  Object.keys(formData).forEach((key) => {
    if (formData[key] === "") delete formData[key];
  });

  console.log("Dispatching createPropertyAsync", formData);
  dispatch(createPropertyAsync(formData));
};



  return (
    <form className="w-full px-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Sell Your Property</h2>

      {/* Title */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Property Title</label>
        <input
          type="text"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter Property Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Property Type</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex-1 ${form.propertyType === "residential" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
            onClick={() => setForm({ ...form, propertyType: "residential", commercialSubType: "" })}
          >
            Residential
          </button>
          <button
            type="button"
            className={`flex-1 ${form.propertyType === "commercial" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
            onClick={() => setForm({ ...form, propertyType: "commercial", bhk: "" })}
          >
            Commercial
          </button>
        </div>
      </div>

      {/* Commercial subtypes */}
      {form.propertyType === "commercial" && (
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Commercial Type</label>
          <div className="flex gap-4">
            {commercialTypes.map((ct) => (
              <button
                key={ct.value}
                type="button"
                className={`flex items-center gap-2 flex-1 ${form.commercialSubType === ct.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
                onClick={() => setForm({ ...form, commercialSubType: ct.value })}
              >
                {ct.icon} {ct.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Location section with Redux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            disabled={loadingCountries}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            disabled={!form.country || loadingStates}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">District</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            disabled={!form.state || loadingDistricts}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Locality</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Enter Locality"
            value={form.locality}
            onChange={(e) => setForm({ ...form, locality: e.target.value })}
          />
        </div>
      </div>

      {/* RESIDENTIAL fields */}
      {form.propertyType === "residential" && (
        <>
          {/* BHK */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">BHK</label>
            <div className="flex gap-4">
              {["1bhk", "2bhk", "3bhk", "4bhk+"].map((bhk) => (
                <button
                  key={bhk}
                  type="button"
                  className={`flex-1 ${form.bhk === bhk ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
                  onClick={() => setForm({ ...form, bhk })}
                >
                  {bhk.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {/* Built-up Area, Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Built-Up Area</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="flex-1 border rounded-lg px-4 py-2"
                  placeholder="Area"
                  value={form.builtUpArea}
                  onChange={(e) => setForm({ ...form, builtUpArea: e.target.value })}
                />
                <select
                  className="w-24 border rounded-lg px-2"
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="₹"
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: e.target.value })}
              />
            </div>
          </div>
          {/* Construction Status */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Construction Status</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 ${form.constructionStatus === "ready-to-move" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
                onClick={() => setForm({ ...form, constructionStatus: "ready-to-move" })}
              >
                Ready to Move
              </button>
              <button
                type="button"
                className={`flex-1 ${form.constructionStatus === "under-construction" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
                onClick={() => setForm({ ...form, constructionStatus: "under-construction" })}
              >
                Under Construction
              </button>
            </div>
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

        </>
      )}

      {/* COMMERCIAL fields */}
      {form.propertyType === "commercial" && (
        <>
          {/* Possession Status */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Possession Status</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 ${form.possessionStatus === "ready" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
                onClick={() => setForm({ ...form, possessionStatus: "ready" })}
              >
                Ready to Move
              </button>
              <button
                type="button"
                className={`flex-1 ${form.possessionStatus === "under" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} border rounded-lg px-4 py-2`}
                onClick={() => setForm({ ...form, possessionStatus: "under" })}
              >
                Under Construction
              </button>
            </div>
            {/* Show available date only if under construction */}
            {form.possessionStatus === "under" && (
              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Available Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.commercialAvailableDate}
                  onChange={(e) => setForm({ ...form, commercialAvailableDate: e.target.value })}
                />
              </div>
            )}
          </div>
          {/* About Property */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location Hub</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="IT Park, Business Park, Others"
                value={form.locationHub}
                onChange={(e) => setForm({ ...form, locationHub: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Built-Up Area</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="flex-1 border rounded-lg px-4 py-2"
                  placeholder="Area"
                  value={form.builtUpArea}
                  onChange={(e) => setForm({ ...form, builtUpArea: e.target.value })}
                />
                <select
                  className="w-24 border rounded-lg px-2"
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Ownership</label>
              <select
                className="w-full border rounded-lg px-4 py-2"
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Total Floors</label>
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="No. of Floors"
                value={form.floorsAvailable}
                onChange={(e) => setForm({ ...form, floorsAvailable: e.target.value })}
              />
            </div>
          </div>
          {/* Price Details */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Expected Price (Financials)</label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="₹"
              value={form.expectedPrice}
              onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })}
            />
          </div>
        </>
      )}

      {/* Amenities */}
      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium text-gray-700">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity.name}
              type="button"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${form.amenities.includes(amenity.name) ? "bg-blue-500 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300"}`}
              onClick={() => handleSelectAmenities(amenity.name)}
            >
              <span>{amenity.icon}</span>
              <span>{amenity.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photo & Video Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Upload Photos</label>
          <input
            type="file"
            className="w-full border rounded-lg px-4 py-2"
            multiple
            onChange={(e) => handleFileChange(e, "images")}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Upload Videos</label>
          <input
            type="file"
            className="w-full border rounded-lg px-4 py-2"
            multiple
            onChange={(e) => handleFileChange(e, "videos")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="w-full md:w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit Property
        </button>
      </div>
    </form>
  );
};

export default SellForm;
