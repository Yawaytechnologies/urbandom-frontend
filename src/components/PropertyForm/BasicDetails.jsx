import React from "react";
const propertyTypes = ["Residential", "Commercial"];
const allListingTypes = ["Rent", "Sell", "PG / Co-living"];

// Example options (replace with your dynamic lists)
const countryOptions = [
  { value: "", label: "Select Country" },
  { value: "India", label: "India" },
  { value: "USA", label: "USA" },
];
const stateOptions = {
  India: [
    { value: "", label: "Select State" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Karnataka", label: "Karnataka" },
  ],
  USA: [
    { value: "", label: "Select State" },
    { value: "California", label: "California" },
    { value: "Texas", label: "Texas" },
  ],
};
const districtOptions = {
  "Tamil Nadu": [
    { value: "", label: "Select District" },
    { value: "Chennai", label: "Chennai" },
    { value: "Coimbatore", label: "Coimbatore" },
  ],
  "Karnataka": [
    { value: "", label: "Select District" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Mysore", label: "Mysore" },
  ],
  "California": [
    { value: "", label: "Select District" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "San Diego", label: "San Diego" },
  ],
  "Texas": [
    { value: "", label: "Select District" },
    { value: "Houston", label: "Houston" },
    { value: "Dallas", label: "Dallas" },
  ],
};

const BasicDetails = ({
  propertyType, setPropertyType,
  listingType, setListingType,
  country, setCountry,
  selectedState, setSelectedState,
  district, setDistrict,
  locality, setLocality,
  onNext,
}) => {
  // Show PG / Co-living only for Residential
  const listingTypes =
    propertyType === "Residential"
      ? allListingTypes
      : allListingTypes.filter(type => type !== "PG / Co-living");

  // Auto-reset to Rent if Commercial is selected while PG was active
  React.useEffect(() => {
    if (propertyType === "Commercial" && listingType === "PG / Co-living") {
      setListingType("Rent");
    }
  }, [propertyType, listingType, setListingType]);

  // Reset state & district when country changes
  React.useEffect(() => {
    setSelectedState("");
    setDistrict("");
  }, [country, setSelectedState, setDistrict]);

  // Reset district when state changes
  React.useEffect(() => {
    setDistrict("");
  }, [selectedState, setDistrict]);

  const canProceed =
    propertyType &&
    listingType &&
    country &&
    selectedState &&
    district &&
    locality;

  return (
<div>
    {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Basic Details
      </h2>
      {/* Property Type Tabs */}
            <div className="mb-2 text-gray-700 font-semibold">Property Type</div>

      <div className="flex gap-4 mb-6">
        {propertyTypes.map(type => (
          <button
            key={type}
            className={`flex-1 py-2 rounded-full font-bold transition-all 
              ${propertyType === type 
                ? "bg-background text-text-secondary shadow" 
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}
            `}
            onClick={() => setPropertyType(type)}
            type="button"
          >{type}</button>
        ))}
      </div>
      {/* Listing Type Tabs */}
            <div className="mb-2 text-gray-700 font-semibold">Looking to</div>

      <div className="flex gap-4 mb-8">
        {listingTypes.map(type => (
          <button
            key={type}
            className={`flex-1 py-2 rounded-full font-semibold transition-all
              ${listingType === type
                ? "bg-background text-text-secondary shadow"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}
            `}
            onClick={() => setListingType(type)}
            type="button"
          >{type}</button>
        ))}
      </div>
      {/* Country + State */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 font-semibold">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338ca] text-lg "
            value={country}
            onChange={e => setCountry(e.target.value)}
          >
            {countryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 font-semibold">
            State <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338ca] text-lg "
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            disabled={!country}
          >
            {(stateOptions[country] || [{ value: "", label: "Select State" }]).map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* District + Locality */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 font-semibold">
            District <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338ca] text-lg "
            value={district}
            onChange={e => setDistrict(e.target.value)}
            disabled={!selectedState}
          >
            {(districtOptions[selectedState] || [{ value: "", label: "Select District" }]).map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 font-semibold">
            Locality <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338ca] text-lg font-medium"
            placeholder="Enter locality"
            value={locality}
            onChange={e => setLocality(e.target.value)}
          />
        </div>
      </div>
      {/* Next Button */}
      <div className="flex justify-end">
        <button
          className={`py-2 px-6 rounded-lg font-bold shadow transition-all
            ${canProceed
              ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}
          `}
          disabled={!canProceed}
          onClick={onNext}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicDetails;
