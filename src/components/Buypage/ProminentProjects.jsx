// src/components/Buypage/ProminentProjects.jsx
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProminentProperties } from "../../redux/actions/buyPageActions";
import { useNavigate } from "react-router-dom";

const ProminentProjects = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const prominent = useSelector((state) => state.buyPage.prominentProperties);
  const loading = useSelector((state) => state.buyPage.loading?.prominent);

  useEffect(() => {
    dispatch(fetchProminentProperties());
  }, [dispatch]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  const handleViewDetails = (propertyId) => {
    navigate(`/property-overview/${propertyId}`);
  };

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Prominent Projects</h2>
          <p className="text-sm text-gray-500">Explore top-rated projects curated for you</p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {loading ? (
            <p className="py-6">Loading...</p>
          ) : (
            (prominent || []).map((item, index) => (
              <div
                key={item._id || index}
                className="min-w-[300px] bg-[#f9f9f9] p-4 rounded-md shadow-md flex-shrink-0"
              >
                <img
                  src={item.media?.images?.[0] || "/default.jpg"}
                  alt={item.title || "Property"}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.location?.district}, {item.location?.state}
                </p>
                <p className="text-pink-600 font-bold mt-1">
                  ₹ {Number(item.price || 0).toLocaleString()}
                </p>
                <button
                  onClick={() => handleViewDetails(item._id)}
                  className="mt-3 bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 text-sm"
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button onClick={scrollLeft} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            ←
          </button>
          <button onClick={scrollRight} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProminentProjects;
