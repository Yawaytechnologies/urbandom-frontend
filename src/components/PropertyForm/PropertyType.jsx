import React, { useState } from "react";
import { FaHome, FaHandHoldingUsd, FaBed } from "react-icons/fa"; // Rent, Sell, PG
import RentForm from "../PropertyForm/Rent";
import SellForm from "../PropertyForm/Sell";
import PGCoLivingForm from "../PropertyForm/PG-Coliving";

const CARD_OPTIONS = [
  {
    key: "Rent",
    label: "Rent",
    desc: "Post your rental property",
    icon: <FaHome />,
    gradient: "from-blue-400 via-blue-500 to-blue-700",
    shadow: "shadow-blue-400/40",
  },
  {
    key: "Sell",
    label: "Sell",
    desc: "Sell your property",
    icon: <FaHandHoldingUsd />,
    gradient: "from-green-400 via-green-500 to-green-600",
    shadow: "shadow-green-400/40",
  },
  {
    key: "PG/Co-living",
    label: "PG / Co-living",
    desc: "Post your PG / Co-living property",
    icon: <FaBed />,
    gradient: "from-purple-400 via-purple-500 to-purple-600",
    shadow: "shadow-purple-400/40",
  },
];

const PropertyTypeSelector = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [pulseIndex, setPulseIndex] = useState(null);
  const [lookingTo, setLookingTo] = useState(""); // State to store 'lookingTo'

  // This function will set the 'lookingTo' state based on the selected property type
const handleSelectForm = (form, idx) => {
  setPulseIndex(idx); // trigger pulse effect

  setTimeout(() => {
    setSelectedForm(form);

    // Set lookingTo based on selected form type
    let lookingToValue = "";
    if (form === "Rent") {
      lookingToValue = "rent";
    } else if (form === "Sell") {
      lookingToValue = "sell";
    } else if (form === "PG/Co-living") {
      lookingToValue = "pg-co/living";
    }

    setLookingTo(lookingToValue); // Set lookingTo in state here
    setPulseIndex(null);
  }, 200); // Pulse duration before showing form
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12 relative transition-colors duration-700">
      {/* Decorative blurred blobs for background */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-300/30 rounded-full filter blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-24 right-10 w-96 h-72 bg-purple-300/40 rounded-full filter blur-3xl opacity-70 -z-10"></div>

      {/* Animated Back Button */}
      {selectedForm && (
        <button
          className="mb-6 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-gray-200 shadow-md font-medium text-gray-700 hover:bg-white transition-all fade-in"
          onClick={() => setSelectedForm(null)}
        >
          ← Back
        </button>
      )}

      {!selectedForm ? (
        <>
          <h2 className="text-5xl font-black mb-12 text-gray-800 drop-shadow-lg tracking-tight">
            Looking To
          </h2>
          <div className="flex flex-wrap gap-12 justify-center items-center">
            {CARD_OPTIONS.map((opt, idx) => (
              <div
                key={opt.key}
                className={`group relative w-72 h-72 rounded-3xl flex flex-col items-center justify-center
                bg-gradient-to-br ${opt.gradient} ${opt.shadow}
                text-white cursor-pointer select-none
                transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                active:scale-100
                overflow-hidden
                ${pulseIndex === idx ? "animate-pulse-fast" : ""}`}
                style={{
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                }}
                onClick={() => handleSelectForm(opt.key, idx)}
              >
                <div className="text-6xl mb-3 transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95 drop-shadow-lg">
                  {opt.icon}
                </div>
                <h3 className="text-2xl font-extrabold mb-1 drop-shadow">{opt.label}</h3>
                <p className="text-base font-medium opacity-90">{opt.desc}</p>
                <span
                  className="pointer-events-none absolute top-0 left-0 w-full h-full
                  bg-gradient-to-tr from-white/20 via-white/10 to-transparent
                  opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg
                  rounded-3xl"
                ></span>
              </div>
            ))}
          </div>
          <style>{`
            .animate-pulse-fast {
              animation: pulse-fast 0.18s;
            }
            @keyframes pulse-fast {
              0% { transform: scale(1); }
              50% { transform: scale(1.06); }
              100% { transform: scale(1); }
            }
            .fade-in { animation: fadeIn 0.35s; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }
          `}</style>
        </>
      ) : (
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 fade-in">
          {/* Show the form based on the selected property type */}
          {selectedForm === "Rent" && <RentForm lookingTo={lookingTo} />}
          {selectedForm === "Sell" && <SellForm lookingTo={lookingTo} />}
          {selectedForm === "PG/Co-living" && <PGCoLivingForm lookingTo={lookingTo} />}
        </div>  
      )}
    </div>
  );
};

export default PropertyTypeSelector;
