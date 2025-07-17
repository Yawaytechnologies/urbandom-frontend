import React from "react";
import { FaBuilding, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const EnquiryMain = ({
  activePromo = 0,
  handlePrev = () => {},
  handleNext = () => {},
  promoCards = [],
  sampleEnquiries = [],
  activeTab = "All",
  setActiveTab = () => {},
}) => {
  const activeCard = promoCards[activePromo] || {};
  const tabs = ["All", "Contacted", "Matching Tenants"];

  return (
    <main className="flex-1 pr-3 overflow-y-auto max-h-screen">
      {/* Mobile/Tablet Heading and Enquiries Selector */}
      <div className="md:hidden px-4 py-2">
        <h2 className="text-sm font-semibold mb-3 text-gray-800">
          Enquiries for
        </h2>
        <div className="flex space-x-3 overflow-x-auto scrollbar-none mb-4">
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

        {/* Mobile Tab Selector */}
        <div className="flex gap-2 w-full overflow-x-auto scrollbar-none pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm border font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab
                  ? "bg-[#e6deff] border-[#5f36ff] text-[#5f36ff] font-semibold"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              {tab}
              <span
                className={`ml-1 text-xs px-2 py-1 rounded-full ${
                  activeTab === tab
                    ? "bg-white text-[#5f36ff]"
                    : "bg-[#f2f2ff] text-purple-700"
                }`}
              >
                0
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Enquiry Heading + Cards */}
      <div className="hidden md:block bg-gradient-to-r from-[#ebe1ff] to-[#e3c6ff] rounded-xl p-3 mb-4 shadow-md max-w-3xl w-full ml-[20px]">
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

      {/* Promo Card Section (Responsive) */}
      {promoCards?.length > 0 && (
        <>
          {/* Desktop version (with arrows) */}
          <div className="relative hidden md:block max-w-3xl w-full ml-[20px] min-h-[165px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePromo}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className={`rounded-xl px-6 py-4 shadow-md w-full flex justify-between items-center ${
                  activeCard.bg || "bg-white"
                }`}
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
                    <p className="text-sm text-gray-700 mb-3">
                      {activeCard.sub}
                    </p>
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ✅ Mobile/Tablet version (carousel with scroll snap) */}
          <div className="md:hidden px-4 mt-2 overflow-hidden">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none">
              {promoCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`snap-start min-w-[90%] sm:min-w-[320px] max-w-[90%] flex-shrink-0 rounded-xl p-4 shadow-md ${
                    card.bg || "bg-white"
                  }`}
                >
                  <img
                    src={card.img || ""}
                    alt="promo"
                    className="h-[80px] mb-3 w-auto object-contain"
                  />
                  <h2 className="text-base font-bold text-gray-900">
                    {card.heading}{" "}
                    <span className="text-green-700 underline">
                      {card.highlighted || ""}
                    </span>
                  </h2>
                  <p className="text-xs text-gray-700 mb-2">{card.sub}</p>
                  <button
                    className={`text-white text-xs font-semibold px-4 py-1.5 rounded ${
                      card.btnColor || "bg-gray-400"
                    }`}
                  >
                    {card.btnText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default EnquiryMain;
