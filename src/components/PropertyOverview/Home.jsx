import React, { useState } from "react";

const Overview = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const propertyData = {
    title: "Sameera New Vision Township",
    developer: "SAMEERA GROUPS",
    location: "East Tambaram, Chennai South, Chennai",
    bannerImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "/assets/video.mp4",
    galleryImage: "/house.jpg",
    galleryCount: 17,
    priceRange: "₹33.0 L - 2.22 Cr",
    pricePerSqFt: "₹5.5 K/sq.ft",
    emi: "EMI starts at ₹17.48 K",
    area: "600 - 4042 sq.ft",
    configuration: "Residential Plots",
    possession: "Ready to Move",
    rating: 4.2,
    lastUpdated: "Jul 6, 2025",
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-6 text-gray-800">
      {/* Breadcrumb + Last Updated */}
      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <p>Home / Chennai / Chennai South / Tambaram / {propertyData.title}</p>
        <p>Last updated: {propertyData.lastUpdated}</p>
      </div>

      {/* Title + Pricing */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left: Title & Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            {propertyData.title}
            <span className="ml-2 inline-flex items-center text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
              ✅ RERA
            </span>
          </h1>
          <p className="text-sm mt-1">
            By{" "}
            <span className="text-purple-700 font-medium">
              {propertyData.developer}
            </span>
          </p>
          <p className="text-sm text-gray-600">{propertyData.location}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="flex items-center bg-purple-600 text-white px-3 py-1 text-sm font-medium rounded">
              ⭐ {propertyData.rating}
            </span>
            <button className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-purple-200 to-purple-100 text-purple-800 rounded">
              Write a Review
            </button>
          </div>
        </div>

        {/* Right: Price Block */}
        <div className="text-right">
          <p className="text-2xl font-bold text-black">
            {propertyData.priceRange}{" "}
            <span className="text-base font-normal text-black">
              | {propertyData.pricePerSqFt}
            </span>
          </p>
          <p className="text-sm text-purple-600">{propertyData.emi}</p>
          <p className="text-xs text-gray-500 mt-0.5">Base Price</p>
          <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded font-semibold text-sm flex items-center justify-center gap-1">
            📞 Contact Sellers
          </button>
        </div>
      </div>

      {/* Banner + Video + Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Banner */}
        <div className="relative col-span-2">
          <img
            src={propertyData.bannerImage}
            alt="Cover"
            className="w-full h-[280px] md:h-[400px] object-cover rounded-lg"
          />
          <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Cover Image
          </span>
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="bg-white px-3 py-1 text-sm rounded shadow">
              🔗 Share
            </button>
            <button className="bg-white px-3 py-1 text-sm rounded shadow">
              🤍 Save
            </button>
          </div>
        </div>

        {/* Video + Gallery */}
        <div className="flex flex-col gap-4">
          {/* Video */}
          <div
            className="relative h-[140px] md:h-[190px] bg-black rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/play--v1.png"
              alt="play"
              className="absolute w-10 h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80 group-hover:scale-110 transition duration-200"
            />
            <video
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40"
              muted
            />
            <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Project Video
            </span>
          </div>

          {/* Gallery */}
          <div className="relative h-[140px] md:h-[190px]">
            <img
              src={propertyData.galleryImage}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <p className="text-white text-lg font-medium">
                +{propertyData.galleryCount} more
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 border border-gray-200 rounded-lg overflow-hidden mt-8 text-center text-sm bg-white shadow-sm">
        <div className="py-4 px-2">
          <p className="text-base font-semibold text-black">
            {propertyData.configuration}
          </p>
          <p className="text-gray-500 mt-1">Configuration</p>
        </div>
        <div className="py-4 px-2">
          <p className="text-base font-semibold text-black">
            {propertyData.possession}
          </p>
          <p className="text-gray-500 mt-1">Possession Status</p>
        </div>
        <div className="py-4 px-2">
          <p className="text-base font-semibold text-black">
            {propertyData.pricePerSqFt}
          </p>
          <p className="text-gray-500 mt-1">Avg. Price</p>
        </div>
        <div className="py-4 px-2">
          <p className="text-base font-semibold text-black">
            {propertyData.area}
          </p>
          <p className="text-purple-600 text-xs leading-none mt-1 underline cursor-pointer">
            convert unit
          </p>
          <p className="text-gray-500 mt-0.5">(Plot Area)</p>
          <p className="text-gray-500 mt-0.5">Sizes</p>
        </div>
      </div>

      {/* Modal: Video */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
            >
              ❌
            </button>
            <video
              src={propertyData.videoUrl}
              controls
              autoPlay
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Overview;
