import React from 'react';
import { FaCheckCircle, FaHome, FaUsers } from 'react-icons/fa';

const HomeAtFirstSight = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Home at <span className="font-bold text-black">First Sight</span>
          </h2>
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-center gap-4">
              <FaCheckCircle className="text-yellow-500 text-xl" />
              Verified & Onboarded by our experts
            </li>
            <li className="flex items-center gap-4">
              <FaHome className="text-indigo-500 text-xl" />
              Every property detail on just a click
            </li>
            <li className="flex items-center gap-4">
              <FaUsers className="text-pink-500 text-xl" />
              Genuine & vast userbase
            </li>
          </ul>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/homeatsight.png"
            alt="Home At First Sight"
            className="w-full  h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeAtFirstSight;
