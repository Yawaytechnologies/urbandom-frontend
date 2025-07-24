// src/components/buy/ProminentProjects.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProminentProperties } from '../../redux/actions/buyPageActions';
import { useNavigate } from 'react-router-dom';

const ProminentProjects = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  const { prominentProperties, loading } = useSelector((state) => state.buyPage);

  useEffect(() => {
    dispatch(fetchProminentProperties());
  }, [dispatch]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 320;
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property-overview/${propertyId}`);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Prominent Projects</h2>
          <p className="text-sm text-gray-500">Explore top-rated projects curated for you</p>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-1 border rounded-full text-sm"
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar" ref={scrollRef}>
          {prominentProperties.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-[#f9f9f9] p-4 rounded-md shadow-md flex-shrink-0"
            >
              <img
                src={item.media?.images?.[0] || '/default.jpg'}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.location?.district}, {item.location?.state}
              </p>
              <p className="text-pink-600 font-bold mt-1">₹ {item.price?.toLocaleString()}</p>
              <button
                onClick={() => handleViewDetails(item._id)}
                className="mt-3 bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 text-sm"
              >
                View
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={scrollLeft}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProminentProjects;
