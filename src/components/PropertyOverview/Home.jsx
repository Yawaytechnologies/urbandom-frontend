import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaHeart, FaShareAlt } from "react-icons/fa";
import { fetchOverviewHomeData } from "../../redux/actions/overviewHomeActions";
import { useNavContext } from "/src/components/PropertyOverview/NavContext";

const fallbackImages = [
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595526114035-6a8f0d49c9b4?auto=format&fit=crop&w=800&q=80",
];

const Overview = () => {
  const dispatch = useDispatch();
  const { id: propertyId } = useParams();
  const { data: propertyData, loading, error } = useSelector(
    (state) => state.overviewHome
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const { setHideNavbar } = useNavContext();

  useEffect(() => {
    if (propertyId) dispatch(fetchOverviewHomeData(propertyId));
  }, [dispatch, propertyId]);

  const validImages =
    propertyData?.media?.images?.filter(
      (img) => typeof img === "string" && img.trim() !== "" && img !== "string"
    ) || [];

  const images = [...validImages];
  while (images.length < 3) {
    images.push(fallbackImages[images.length % fallbackImages.length]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    setHideNavbar(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHideNavbar(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () =>
    setModalImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  if (!propertyId)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Error: Property ID is required
      </div>
    );

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  const { title, ownership, createdAt, location, priceDetails } =
    propertyData || {};

  const area = location?.name;
  const city = location?.district?.name;
  const state = location?.district?.state?.name;

  const breadcrumb = location
    ? `Home / ${state || ""} / ${city || ""} / ${area || ""} / ${title || ""}`
    : `Home / ${title || ""}`;

  return (
    <section className="w-full bg-white text-gray-800 relative">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-20">
        {/* Breadcrumb */}
        <div className="hidden md:flex justify-between text-xs text-gray-500 mb-2">
          <p>{breadcrumb}</p>
          <p>
            Last updated:{" "}
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-start gap-4 mb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-black">
              {title || "No Title"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {area}, {city}, {state}
            </p>
            <p className="text-sm text-gray-700">Ownership: {ownership}</p>
            <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded mt-1 inline-block">
              ✅ Verified
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-2xl font-bold">
              ₹{priceDetails?.monthlyRent || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              Security Deposit: ₹{priceDetails?.securityDeposit || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              Available From:{" "}
              {priceDetails?.availableDate
                ? new Date(priceDetails.availableDate).toLocaleDateString()
                : "N/A"}
            </p>
            <button className="mt-2 bg-purple-600 text-white font-medium py-2 px-6 rounded inline-flex items-center gap-2">
              <FaPhoneAlt /> Contact Owner
            </button>
          </div>
        </div>

        {/* Desktop Images */}
        <div className="hidden lg:grid grid-cols-3 gap-4 mb-6">
          <img
            src={images[0]}
            className="col-span-2 h-[400px] w-full object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(0)}
            onError={(e) => (e.target.src = fallbackImages[0])}
            alt="Main"
          />
          <div className="flex flex-col gap-4">
            <img
              src={images[1]}
              className="h-[190px] w-full object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(1)}
              onError={(e) => (e.target.src = fallbackImages[1])}
              alt="Secondary"
            />
            <div
              className="relative cursor-pointer h-[190px] w-full"
              onClick={() => openModal(2)}
            >
              <img
                src={images[2]}
                className="h-full w-full object-cover rounded-lg"
                onError={(e) => (e.target.src = fallbackImages[2])}
                alt="More"
              />
              {images.length > 3 && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
                  +{images.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden w-full overflow-hidden mt-4">
          <img
            src={images[currentIndex]}
            alt="Mobile Hero"
            className="w-full h-[220px] object-cover rounded-md cursor-pointer"
            onClick={() => openModal(currentIndex)}
            onError={(e) =>
              (e.target.src =
                fallbackImages[currentIndex % fallbackImages.length])
            }
          />
        </div>

        {/* Mobile Header */}
        <div className="block md:hidden mt-4 mb-6 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-black">
              {title || "No Title"}
            </h1>
            <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
              ✅ Verified
            </p>
          </div>

          <p className="text-sm text-gray-600">
            {area}, {city}, {state}
          </p>

          <p className="text-sm text-gray-700">Ownership: {ownership}</p>

          <p className="text-xl font-bold text-gray-900">
            ₹{priceDetails?.monthlyRent || "N/A"}
          </p>

          <p className="text-sm text-gray-700">
            Security Deposit: ₹{priceDetails?.securityDeposit || "N/A"}
          </p>

          <p className="text-sm text-gray-700">
            Available From:{" "}
            {priceDetails?.availableDate
              ? new Date(priceDetails.availableDate).toLocaleDateString()
              : "N/A"}
          </p>

          <button className="mt-4 bg-purple-600 text-white font-medium py-3 w-full rounded flex justify-center items-center gap-2">
            <FaPhoneAlt /> Contact Owner
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center text-white">
          <div className="w-full px-6 py-4 flex justify-between items-center border-b border-white/20">
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-sm text-gray-200">
                ₹{priceDetails?.monthlyRent || "N/A"} / month
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <FaShareAlt className="cursor-pointer hover:text-gray-300" />
              <FaHeart className="cursor-pointer hover:text-gray-300" />
              <button
                onClick={closeModal}
                className="text-2xl font-bold ml-4 hover:text-gray-400"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative w-full max-w-6xl px-4">
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4 z-50"
            >
              ‹
            </button>
            <img
              src={images[modalImageIndex]}
              alt={`Image ${modalImageIndex + 1}`}
              className="max-h-[80vh] object-contain rounded-lg mx-auto"
              onError={(e) =>
                (e.target.src =
                  fallbackImages[modalImageIndex % fallbackImages.length])
              }
            />
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4 z-50"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Overview;
