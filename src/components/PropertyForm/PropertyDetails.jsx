const commercialTypes = [
  "Office", "Retail Shop", "Showroom", "Warehouse", "Plot", "Others"
];
const zoneTypes = [
  "Industrial", "Commercial", "Residential", "Special economic zone", "Open Spaces", "Agricultural zone", "Others"
];
const ownershipTypes = [
  "Freehold", "Leasehold", "Cooperative society", "Power of attorney"
];
const residentialTypes = [
  "Apartment", "Independent House", "Duplex", "Independent Floor",
  "Villa", "Penthouse", "Studio", "Farm House"
];

const PropertyDetails = (props) => {
  const {
    propertyType,
    listingType,
    subtype, setSubtype,
    society, setSociety,
    locality, setLocality,
    zoneType, setZoneType,
    availableFrom, setAvailableFrom,
    plotArea, setPlotArea,
    areaUnit, setAreaUnit,
    ownership, setOwnership,
    onBack, onNext
  } = props;

  // --- Commercial + Rent ---
  if (propertyType === "Commercial" && listingType === "Rent") {
    return (
      <>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-semibold">
            Property Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {commercialTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`py-5 px-2 rounded-xl border text-sm font-medium flex flex-col items-center
                  ${subtype === type
                    ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                `}
                onClick={() => setSubtype(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-500 font-medium mb-1">
            Building/Project/Society (Optional)
          </label>
          <input
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            placeholder="Enter name"
            value={society}
            onChange={e => setSociety(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Locality <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            placeholder="Enter locality"
            value={locality}
            onChange={e => setLocality(e.target.value)}
          />
        </div>
        <div className="border-t pt-6 mt-2 mb-6">
          <div className="font-bold text-black mb-2">POSSESSION INFO</div>
          <label className="block text-gray-700 font-semibold mb-2">Available From <span className="text-red-500">*</span></label>
          <input
            type="date"
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            value={availableFrom}
            onChange={e => setAvailableFrom(e.target.value)}
          />
        </div>
        <div className="border-t pt-6 mt-2 mb-6">
          <div className="font-bold text-black mb-2">ABOUT THE PROPERTY</div>
          <label className="block text-gray-700 font-semibold mb-2">
            Zone Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {zoneTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`py-2 px-2 rounded-xl border text-sm font-medium
                  ${zoneType === type
                    ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                `}
                onClick={() => setZoneType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-2 text-gray-700 font-semibold">
              Plot Area <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
              placeholder="Plot area"
              value={plotArea}
              onChange={e => setPlotArea(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-gray-700 font-semibold">Select Area Unit</label>
            <select
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
              value={areaUnit}
              onChange={e => setAreaUnit(e.target.value)}
            >
              <option value="sq.ft.">sq. ft.</option>
              <option value="sq.m.">sq. m.</option>
              <option value="acres">acres</option>
            </select>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Ownership <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ownershipTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`py-2 px-2 rounded-xl border text-sm font-medium
                  ${ownership === type
                    ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                `}
                onClick={() => setOwnership(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        {/* Nav buttons */}
        <div className="flex justify-between mt-8">
          <button
            className="py-2 px-6 rounded-lg font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
            type="button"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className={`py-2 px-6 rounded-lg font-bold shadow transition-all
              ${(subtype && locality && zoneType && availableFrom && plotArea && ownership)
                ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
            disabled={!(subtype && locality && zoneType && availableFrom && plotArea && ownership)}
            type="button"
            onClick={onNext}
          >
            Next, add price details
          </button>
        </div>
      </>
    );
  }

  // --- Commercial + Sell ---
  if (propertyType === "Commercial" && listingType === "Sell") {
    return (
      <>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-semibold">
            Property Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {commercialTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`py-5 px-2 rounded-xl border text-sm font-medium flex flex-col items-center
                  ${subtype === type
                    ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                `}
                onClick={() => setSubtype(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-500 font-medium mb-1">
            Building/Project/Society (Optional)
          </label>
          <input
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            placeholder="Enter name"
            value={society}
            onChange={e => setSociety(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Locality <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            placeholder="Enter locality"
            value={locality}
            onChange={e => setLocality(e.target.value)}
          />
        </div>
        <div className="border-t pt-6 mt-2 mb-6">
          <div className="font-bold text-black mb-2">ABOUT THE PROPERTY</div>
          <label className="block text-gray-700 font-semibold mb-2">
            Zone Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {zoneTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`py-2 px-2 rounded-xl border text-sm font-medium
                  ${zoneType === type
                    ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                `}
                onClick={() => setZoneType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-2 text-gray-700 font-semibold">
              Plot Area <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
              placeholder="Plot area"
              value={plotArea}
              onChange={e => setPlotArea(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-gray-700 font-semibold">Select Area Unit</label>
            <select
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
              value={areaUnit}
              onChange={e => setAreaUnit(e.target.value)}
            >
              <option value="sq.ft.">sq. ft.</option>
              <option value="sq.m.">sq. m.</option>
              <option value="acres">acres</option>
            </select>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Ownership <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ownershipTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`py-2 px-2 rounded-xl border text-sm font-medium
                  ${ownership === type
                    ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                `}
                onClick={() => setOwnership(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        {/* Nav buttons */}
        <div className="flex justify-between mt-8">
          <button
            className="py-2 px-6 rounded-lg font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
            type="button"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className={`py-2 px-6 rounded-lg font-bold shadow transition-all
              ${(subtype && locality && zoneType && plotArea && ownership)
                ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
            disabled={!(subtype && locality && zoneType && plotArea && ownership)}
            type="button"
            onClick={onNext}
          >
            Next, add price details
          </button>
        </div>
      </>
    );
  }
  // --- Residential + PG / Co-living ---
if (propertyType === "Residential" && listingType === "PG / Co-living") {
  return (
    <>
      {/* PG DETAILS */}
      <div className="mb-8">
        <div className="font-bold text-lg mb-4">PG DETAILS</div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            PG Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            placeholder="Enter PG Name"
            value={society}
            onChange={e => setSociety(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Total Beds <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
            placeholder="Enter number of beds"
            value={props.totalBeds || ""}
            onChange={e => props.setTotalBeds?.(e.target.value)}
          />
        </div>
        {/* Best suited for */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Best suited for <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Students", "Professionals"].map(type => (
              <button
                key={type}
                type="button"
                className={`py-2 px-6 rounded-lg border font-medium ${
                  props.bestSuitedFor === type
                    ? "bg-[#ede9fe] text-[#7c3aed] border-[#7c3aed] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => props.setBestSuitedFor?.(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        {/* Meals Available */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Meals Available <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map(option => (
              <button
                key={option}
                type="button"
                className={`py-2 px-6 rounded-lg border font-medium ${
                  props.mealsAvailable === option
                    ? "bg-[#ede9fe] text-[#7c3aed] border-[#7c3aed] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => props.setMealsAvailable?.(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* Notice period and lock-in */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Notice Period (Days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
              placeholder="Enter notice period"
              value={props.noticePeriod || ""}
              onChange={e => props.setNoticePeriod?.(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Lock in Period (Days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
              placeholder="Enter lock in period"
              value={props.lockInPeriod || ""}
              onChange={e => props.setLockInPeriod?.(e.target.value)}
            />
          </div>  
        </div>
        {/* Common Areas */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Common Areas <span className="text-red-500">*</span>  
          </label>
          <div className="flex flex-wrap gap-3">
            {["Living Room", "Kitchen", "Dining Hall", "Study Room / Library", "Breakout Room"].map(area => (
              <button
                key={area}
                type="button"
                className={`py-2 px-4 rounded-lg border font-medium ${
                  props.commonAreas?.includes(area)
                    ? "bg-[#ede9fe] text-[#7c3aed] border-[#7c3aed] font-bold shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => {
                  if (props.setCommonAreas) {
                    if (props.commonAreas?.includes(area)) {
                      props.setCommonAreas(props.commonAreas.filter(a => a !== area));
                    } else {
                      props.setCommonAreas([...(props.commonAreas || []), area]);
                    }
                  }
                }}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="py-2 px-6 rounded-lg font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
          type="button"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className={`py-2 px-6 rounded-lg font-bold shadow transition-all
            ${(society && props.totalBeds && props.bestSuitedFor && props.mealsAvailable && props.noticePeriod && props.lockInPeriod && props.commonAreas?.length)
              ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          disabled={!(society && props.totalBeds && props.bestSuitedFor && props.mealsAvailable && props.noticePeriod && props.lockInPeriod && props.commonAreas?.length)}
          type="button"
          onClick={onNext}
        >
          Next, add room details
        </button>
      </div>
    </>
  );
}


  // --- Residential + Rent ---
  return (
    <>
      <div className="mb-8">
        <label className="block mb-2 text-gray-700 font-semibold">
          Select Property Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {residentialTypes.map(type => (
            <button
              key={type}
              className={`py-2 px-2 rounded-xl border text-sm font-medium
                ${subtype === type
                  ? "bg-[#ece9fc] text-[#4338ca] border-[#4338ca] font-bold shadow"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
              `}
              onClick={() => setSubtype(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-500 font-medium mb-1">
          Building/Project/Society (Optional)
        </label>
        <input
          className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg text-base focus:ring-2 focus:ring-[#4338ca]"
          placeholder="Enter name"
          value={society}
          onChange={e => setSociety(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <label className="block text-gray-700 font-semibold mb-2">Locality</label>
        <input
          className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg text-base focus:ring-2 focus:ring-[#4338ca]"
          placeholder="Enter locality"
          value={locality}
          onChange={e => setLocality(e.target.value)}
        />
      </div>
      {/* ...Nav buttons as before, with required fields for residential */}
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
            ${(subtype && locality)
              ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}
          `}
          disabled={!(subtype && locality)}
          type="button"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PropertyDetails;
