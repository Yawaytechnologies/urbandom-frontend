const PriceDetails = ({
  rent, setRent, onBack, onSubmit,
}) => {
  // Housing.com style: only rent for commercial, but you can extend as needed.
  const canSubmit = !!rent;

  return (
    <>
      <div className="mb-6">
        <div className="font-bold text-black mb-2">FINANCIALS</div>
        <label className="block mb-2 text-gray-700 font-semibold">
          Expected Rent <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min={0}
          className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg"
          placeholder="Enter expected rent"
          value={rent}
          onChange={e => setRent(e.target.value)}
        />
      </div>
      {/* If you want to show security deposit etc for residential, use propertyType check here */}
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
            ${canSubmit
              ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}
          `}
          disabled={!canSubmit}
          type="button"
          onClick={onSubmit}
        >
          Post Property
        </button>
      </div>
    </>
  );
};

export default PriceDetails;
