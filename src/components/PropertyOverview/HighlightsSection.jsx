import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HighlightsSection() {
  const [showMore, setShowMore] = useState(false);

  const highlights = [
    "Close to the upcoming Sholinganallur Metro Station",
    "Proximity to entertainment hubs (Mayajaal, VGP, MGM, BSR Mall and more)",
    "A Block - Stilt Plus 3 floors and Block B, C, D, E, F - stilt plus 4 floors",
    "Easy access to both OMR and ECR",
    "Proximity to Schools and Colleges (Campus K International School, Narayana E-Techno School, Velammal Vidyalaya Primrose School and more)",
  ];

  const extra = "Bonus: Green open spaces and modern clubhouse amenities";

  return (
    <div className="relative p-4 sm:p-5 md:p-6 rounded-xl border border-[#c3baff] bg-[#ece6ff] text-gray-900 shadow-md">
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-xl z-0 pointer-events-none glow-border" />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-gray-900">
          Why Jk ?
        </h2>

        <ul className="list-disc list-inside space-y-2 text-sm sm:text-[15px] text-gray-800">
          {highlights.map((text, index) => (
            <li key={index}>{text}</li>
          ))}

          <AnimatePresence>
            {showMore && (
              <motion.li
                key="extra"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {extra}
              </motion.li>
            )}
          </AnimatePresence>
        </ul>

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition w-full text-left sm:w-auto"
        >
          {showMore ? "Hide Highlights ↑" : "View More Highlights ↓"}
        </button>
      </div>

      {/* Glow Effect Styling */}
      <style>{`
        .glow-border {
          box-shadow:
            0 0 0px 1px #c3baff,
            0 0 10px 3px rgba(159, 121, 255, 0.4),
            0 0 20px 6px rgba(159, 121, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
