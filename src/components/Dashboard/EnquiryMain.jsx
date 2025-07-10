import React from "react";
import { FaBuilding, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const EnquiryMain = ({
  activePromo = 0,
  handlePrev = () => {},
  handleNext = () => {},
  promoCards = [],
  sampleEnquiries = [],
}) => {
  const activeCard = promoCards[activePromo] || {};

  return (
    <main className="flex-1 pr-3 overflow-y-auto max-h-screen">
      {/* Enquiry Card */}
      <div className="bg-gradient-to-r from-[#ebe1ff] to-[#e3c6ff] rounded-xl p-3 mb-4 shadow-md max-w-3xl w-full ml-[20px]">
        <h2 className="text-sm font-semibold mb-2 text-gray-800">
          Showing 0 Enquiries for:
        </h2>
        <div className="flex space-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-1">
          {sampleEnquiries?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-white border border-purple-400 px-3 py-1.5 rounded-lg min-w-max whitespace-nowrap"
            >
              <FaBuilding className="text-gray-500" />
              <span className="text-sm text-purple-700 font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Card */}
      {promoCards?.length > 0 && (
        <div
          className={`relative rounded-xl px-6 py-4 mb-4 shadow-md max-w-3xl w-full ml-[20px] flex justify-between items-center ${
            activeCard.bg || "bg-white"
          }`}
          style={{ minHeight: "165px" }}
        >
          <div className="flex gap-4 items-center">
            <img
              src={activeCard.img || ""}
              alt="promo"
              className="h-[110px] w-auto object-contain"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {activeCard.heading}{" "}
                <span className="text-green-700 underline">
                  {activeCard.highlighted || ""}
                </span>
              </h2>
              <p className="text-sm text-gray-700 mb-3">{activeCard.sub}</p>
              <button
                className={`text-white text-sm font-semibold px-5 py-2 rounded ${
                  activeCard.btnColor || "bg-gray-400"
                }`}
              >
                {activeCard.btnText}
              </button>
            </div>
          </div>

          {activePromo > 0 && (
            <button
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2"
              onClick={handlePrev}
            >
              <FaArrowLeft />
            </button>
          )}
          {activePromo < promoCards.length - 1 && (
            <button
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2"
              onClick={handleNext}
            >
              <FaArrowRight />
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default EnquiryMain;
