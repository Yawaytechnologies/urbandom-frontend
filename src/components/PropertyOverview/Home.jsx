import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import NavigationBar from "./NavigationBar.jsx";

const Overview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () =>
    setModalImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const propertyData = {
    title: "JK New Vision Township",
    developer: "JK GROUPS",
    location: "East Tambaram, Chennai South, Chennai",
    priceRange: "₹33.0 L - 2.22 Cr",
    pricePerSqFt: "5.5",
    emi: "EMI starts at ₹17.48 K",
    area: "600 - 4042 sq.ft",
    configuration: "Residential Plots",
    possession: "Ready to Move",
    rating: 4.2,
    galleryCount: 17,
    lastUpdated: "Jul 6, 2025",
  };

  return (
    <section  id="overview-home" className="w-full max-w-screen-xl mx-auto pt-6 pb-0 bg-white text-gray-800 relative">
      {/* Breadcrumb + Last Updated */}
      <div className="hidden lg:flex justify-between text-xs text-gray-500 px-6 mb-2">
        <p>Home / Chennai / Chennai South / Tambaram / {propertyData.title}</p>
        <p>Last updated: {propertyData.lastUpdated}</p>
      </div>

      {/* Desktop Top Header */}
      <div className="hidden lg:flex justify-between items-start px-6 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-black flex items-center gap-2">
            {propertyData.title}
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
              ✅ RERA
            </span>
          </h1>
          <p className="text-sm mt-1">
            By <span className="text-purple-700 font-medium">{propertyData.developer}</span>
          </p>
          <p className="text-sm text-gray-600">{propertyData.location}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
              <FaStar className="text-xs" /> {propertyData.rating}
            </span>
            <button className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded font-medium">
              Write a Review
            </button>
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-2xl font-bold">{propertyData.priceRange}</p>
          <p className="text-sm text-gray-700">₹{propertyData.pricePerSqFt} K/sq.ft</p>
          <p className="text-sm text-purple-600">{propertyData.emi}</p>
          <button className="mt-2 bg-purple-600 text-white font-medium py-2 px-6 rounded inline-flex items-center gap-2">
            <FaPhoneAlt /> Contact Sellers
          </button>
        </div>
      </div>

      {/* Desktop Images */}
      <div className="hidden lg:grid grid-cols-3 gap-4 px-6 mb-6">
        <img
          src={images[0]}
          className="col-span-2 h-[400px] w-full object-cover rounded-lg cursor-pointer"
          onClick={() => openModal(0)}
        />
        <div className="flex flex-col gap-4">
          <img
            src={images[1]}
            className="h-[190px] w-full object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(1)}
          />
          <div className="relative cursor-pointer" onClick={() => openModal(2)}>
            <img
              src={images[2]}
              className="h-[190px] w-full object-cover rounded-lg"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
              +{propertyData.galleryCount} more
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Details Row */}
      <div className="hidden lg:grid grid-cols-4 divide-x px-6 border-x border-b border-gray-200 rounded-b-lg bg-white shadow-sm text-center text-sm mb-6">
        <div className="py-4">
          <p className="font-semibold">{propertyData.configuration}</p>
          <p className="text-gray-500">Configuration</p>
        </div>
        <div className="py-4">
          <p className="font-semibold">{propertyData.possession}</p>
          <p className="text-gray-500">Possession</p>
        </div>
        <div className="py-4">
          <p className="font-semibold">₹{propertyData.pricePerSqFt} K/sq.ft</p>
          <p className="text-gray-500">Avg. Price</p>
        </div>
        <div className="py-4">
          <p className="font-semibold">{propertyData.area}</p>
          <p className="text-purple-600 underline text-xs">convert unit</p>
          <p className="text-gray-500 text-xs">(Plot Area)</p>
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="block lg:hidden w-full overflow-hidden px-4">
        <img
          src={images[currentIndex]}
          alt="Mobile Hero"
          className="w-full h-[220px] object-cover rounded-md cursor-pointer"
          onClick={() => openModal(currentIndex)}
        />

        <div className="mt-3 space-y-1">
          <p className="text-xl font-bold">{propertyData.priceRange}
            <span className="ml-2 text-sm text-gray-700">| ₹{propertyData.pricePerSqFt} K/sq.ft</span>
          </p>
          <p className="text-sm text-purple-600">{propertyData.emi}</p>
          <button className="w-full bg-purple-600 text-white py-2 rounded-md flex justify-center items-center gap-2 mt-2">
            <FaPhoneAlt /> Contact Sellers
          </button>

          <h2 className="text-lg font-semibold mt-4 flex items-center gap-2">
            {propertyData.title}
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">✅ RERA</span>
          </h2>
          <p className="text-sm">By <span className="text-purple-700 font-medium">{propertyData.developer}</span></p>
          <p className="text-sm text-gray-600">{propertyData.location}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
              <FaStar /> {propertyData.rating}
            </span>
            <button className="text-sm text-purple-700 underline">Write a Review</button>
          </div>
        </div>
      </div>

      {/* Modal Viewer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white text-3xl font-bold z-50"
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl px-4">
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-5xl px-4 z-50"
            >
              ‹
            </button>
            <img
              src={images[modalImageIndex]}
              alt={`Image ${modalImageIndex + 1}`}
              className="max-h-[85vh] w-full object-contain rounded-lg mx-auto"
            />
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-5xl px-4 z-50"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Sticky Navigation Bar
      <div className="w-full sticky top-0 z-30 bg-white shadow mt-6">
        <NavigationBar />
      </div> */}
    </section>
  );
};

export default Overview;
