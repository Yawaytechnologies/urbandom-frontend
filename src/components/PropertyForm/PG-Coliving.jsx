import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/actions/countryactions";
import { fetchStatesByCountry } from "../../redux/actions/stateActions";
import { fetchDistrictsByState } from "../../redux/actions/districtActions";
import { createPropertyAsync } from "../../redux/actions/propertyAction";
import { uploadPropertyFiles } from "../../redux/services/propertyService"; 

const amenitiesList = [
  { name: "Wi-Fi", icon: "📶" },
  { name: "AC", icon: "❄️" },
  { name: "TV", icon: "📺" },
  { name: "Fridge", icon: "🧊" },
  { name: "Washing Machine", icon: "🧺" },
  { name: "Power Backup", icon: "🔋" },
  { name: "Lift", icon: "🛗" },
  { name: "Parking", icon: "🚗" },
  { name: "Security", icon: "🔐" },
  { name: "Water Supply", icon: "💧" },
];

const PGCoLivingForm = ({ lookingTo }) => {
  const [form, setForm] = useState({
    country: "",
    state: "",
    lookingTo: lookingTo,
    district: "",
    locality: "",
    propertyType: "residential",
    amenities: [],
    images: [],
    location: {
      _id: "66b5f3de5349ac522e309f2d",
      country: "6879d601db874e1c5703d40c",
      state: "6879d6f0dbbb294ecc29e8e7",
      district: "6879d74edbbb294ecc29e8eb",
      name: "Medavakkam",
    },
    videos: [],
    pgDetails: {
      pgName: "",
      totalBeds: "",
      pgFor: "boys",
      suitedFor: "students",

      mealsAvailable: "yes", // Will convert to boolean on submit
      noticePeriod: "",
      lockInPeriod: "",
      roomDetails: [{ roomType: "double-sharing", rent: 21 }],
    },
  });

  const dispatch = useDispatch();
  const { countries, loading: loadingCountries } = useSelector(
    (state) => state.countries
  );
  const { states, loading: loadingStates } = useSelector(
    (state) => state.states
  );
  const { districts, loading: loadingDistricts } = useSelector(
    (state) => state.districts
  );
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPropertyId, setNewPropertyId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Fetch countries on mount
  React.useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  // Fetch states when country changes
  React.useEffect(() => {
    if (form.country) {
      dispatch(fetchStatesByCountry(form.country));
      setForm((f) => ({ ...f, state: "", district: "" }));
    }
  }, [form.country, dispatch]);
  // Fetch districts when state changes
  React.useEffect(() => {
    if (form.state) {
      dispatch(fetchDistrictsByState(form.state));
      setForm((f) => ({ ...f, district: "" }));
    }
  }, [form.state, dispatch]);

  // Amenities select
  const handleSelectAmenities = (amenity) => {
    setForm((prevForm) => {
      const updated = prevForm.amenities.includes(amenity)
        ? prevForm.amenities.filter((a) => a !== amenity)
        : [...prevForm.amenities, amenity];
      return { ...prevForm, amenities: updated };
    });
  };

  const handleUploadFiles = async () => {
  if (!newPropertyId) {
    setUploadMessage("Property not created!");
    return;
  }
  if (uploadedImages.length === 0 && uploadedVideos.length === 0) {
    setUploadMessage("Please select at least one image or video.");
    return;
  }
  setUploading(true);
  setUploadMessage("");

  try {
    // Merge images and videos into one array (as File[])
    const allFiles = [...uploadedImages, ...uploadedVideos];

    await uploadPropertyFiles(newPropertyId, allFiles);
    setUploadMessage("Files uploaded successfully!");
    // Optionally: close modal, reset form, or redirect
    setShowUploadModal(false);
    setUploadedImages([]);
    setUploadedVideos([]);
  } catch (err) {
    setUploadMessage(err.message || "Error uploading files");
  }
  setUploading(false);
};

  // RoomDetails
  const handleRoomDetailChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.pgDetails.roomDetails];
      updated[index][field] = value;
      return {
        ...prev,
        pgDetails: { ...prev.pgDetails, roomDetails: updated },
      };
    });
  };

  const addRoomDetail = () => {
    setForm((prev) => ({
      ...prev,
      pgDetails: {
        ...prev.pgDetails,
        roomDetails: [
          ...prev.pgDetails.roomDetails,
          { roomType: "", rent: "" },
        ],
      },
    }));
  };

  const removeRoomDetail = (index) => {
    setForm((prev) => {
      const updated = [...prev.pgDetails.roomDetails];
      updated.splice(index, 1);
      return {
        ...prev,
        pgDetails: { ...prev.pgDetails, roomDetails: updated },
      };
    });
  };
  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);

    if (type === "images") {
      setUploadedImages((prev) => [...prev, ...files]);
    }
    if (type === "videos") {
      setUploadedVideos((prev) => [...prev, ...files]);
    }
  };

  // PGDetails basic fields
  const handlePGDetailField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      pgDetails: { ...prev.pgDetails, [field]: value },
    }));
  };

  // Submit
  // Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Get ownerId from localStorage
  const ownerId = localStorage.getItem("ownerId");

  if (!ownerId) {
    alert("Owner ID not found. Please log in as Owner.");
    return;
  }

  // Prepare/clean roomDetails
  const cleanedRoomDetails = Array.isArray(form.pgDetails.roomDetails)
    ? form.pgDetails.roomDetails
        .filter((r) => r.roomType && r.rent !== "" && !isNaN(Number(r.rent)))
        .map((r) => ({
          roomType: r.roomType,
          rent: Number(r.rent),
        }))
    : [];

  // Convert mealsAvailable to boolean
  let mealsAvailableBool = form.pgDetails.mealsAvailable;
  if (typeof mealsAvailableBool === "string") {
    mealsAvailableBool = mealsAvailableBool === "yes";
  }

  const pgDetails = {
    ...form.pgDetails,
    totalBeds: form.pgDetails.totalBeds
      ? Number(form.pgDetails.totalBeds)
      : undefined,
    noticePeriod: form.pgDetails.noticePeriod
      ? String(form.pgDetails.noticePeriod)
      : undefined,
    lockInPeriod: form.pgDetails.lockInPeriod
      ? String(form.pgDetails.lockInPeriod)
      : undefined,
    mealsAvailable: mealsAvailableBool,
    roomDetails: cleanedRoomDetails,
  };

  // Remove undefined keys from pgDetails
  Object.keys(pgDetails).forEach(
    (k) => pgDetails[k] === undefined && delete pgDetails[k]
  );

  // Final data to send, including owner
  const formData = {
    country: form.country,
    state: form.state,
    district: form.district,
    locality: form.locality,
    propertyType: form.propertyType,
    location: form.location,
    amenities: form.amenities,
    images: form.images,
    videos: form.videos,
    lookingTo: form.lookingTo,
    pgDetails,
    owner: ownerId, // ✅ Add owner here!
  };

  // Remove undefined/empty top-level keys
  Object.keys(formData).forEach((k) => {
    if (formData[k] === "" || formData[k] === undefined) delete formData[k];
  });

  // Validation
  if (
    !pgDetails.pgName ||
    !pgDetails.roomDetails ||
    pgDetails.roomDetails.length === 0
  ) {
    alert(
      "PG Name and at least one valid Room Type (with rent) are required!"
    );
    return;
  }

  try {
    // Await the thunk, get the result object
    const result = await dispatch(createPropertyAsync(formData)).unwrap();
    console.log("Property creation response:", result);

    // Extract the property ID as per your backend
    const propertyId = result.property && result.property._id;

    if (!propertyId) {
      alert("Property creation failed! No property ID returned.");
      return;
    }

    setNewPropertyId && setNewPropertyId(propertyId); // If using state for property ID
    setShowUploadModal && setShowUploadModal(true);   // If modal is used
  } catch (err) {
    alert(err.message || "Error creating property");
  }
};


  // JSX:
  return (
    <form className="w-full p-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        PG/Co-living Details
      </h2>

      {/* PG Name */}
      <div className="flex flex-col mb-6">
        <label className="mb-2 text-sm font-medium text-gray-700">
          PG Name
        </label>
        <input
          type="text"
          className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter PG Name"
          value={form.pgDetails.pgName}
          onChange={(e) => handlePGDetailField("pgName", e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Country */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            disabled={loadingCountries}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {/* State */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            State
          </label>
          <select
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            disabled={!form.country || loadingStates}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        {/* District */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            District
          </label>
          <select
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            disabled={!form.state || loadingDistricts}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        {/* Locality */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Locality
          </label>
          <input
            type="text"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Locality"
            value={form.locality}
            onChange={(e) => setForm({ ...form, locality: e.target.value })}
          />
        </div>
      </div>

      {/* PG Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Total Beds
          </label>
          <input
            type="number"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Total Beds"
            value={form.pgDetails.totalBeds}
            onChange={(e) => handlePGDetailField("totalBeds", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            PG is For
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`${
                form.pgDetails.pgFor === "boys"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("pgFor", "boys")}
            >
              Boys
            </button>
            <button
              type="button"
              className={`${
                form.pgDetails.pgFor === "girls"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("pgFor", "girls")}
            >
              Girls
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Best Suited For
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`${
                form.pgDetails.suitedFor === "students"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("suitedFor", "students")}
            >
              Students
            </button>
            <button
              type="button"
              className={`${
                form.pgDetails.suitedFor === "professionals"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("suitedFor", "professionals")}
            >
              Professionals
            </button>
            <button
              type="button"
              className={`${
                form.pgDetails.suitedFor === "both"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("suitedFor", "both")}
            >
              Both
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Meals Available
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`${
                form.pgDetails.mealsAvailable === "yes"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("mealsAvailable", "yes")}
            >
              Yes
            </button>
            <button
              type="button"
              className={`${
                form.pgDetails.mealsAvailable === "no"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handlePGDetailField("mealsAvailable", "no")}
            >
              No
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Notice Period
          </label>
          <input
            type="number"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Notice Period"
            value={form.pgDetails.noticePeriod}
            onChange={(e) =>
              handlePGDetailField("noticePeriod", e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Lock-in Period
          </label>
          <input
            type="number"
            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Lock-in Period"
            value={form.pgDetails.lockInPeriod}
            onChange={(e) =>
              handlePGDetailField("lockInPeriod", e.target.value)
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-col mb-6">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Amenities
        </label>
        <div className="grid grid-cols-3 gap-4">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity.name}
              type="button"
              className={`${
                form.amenities.includes(amenity.name)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } border rounded-lg px-4 py-2`}
              onClick={() => handleSelectAmenities(amenity.name)}
            >
              {amenity.icon} {amenity.name}
            </button>
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Room Details (PG Types & Rent)
        </h3>
        {form.pgDetails.roomDetails.map((room, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
          >
            <div>
              <label className="block mb-2 text-sm text-gray-700">
                Room Type
              </label>
              <select
                className="border-2 rounded-lg px-4 py-2 w-full"
                value={room.roomType}
                onChange={(e) =>
                  handleRoomDetailChange(idx, "roomType", e.target.value)
                }
              >
                <option value="">Select Type</option>
                <option value="private">Private</option>
                <option value="double-sharing">Double Sharing</option>
                <option value="triple-sharing">Triple Sharing</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-700">
                Rent (₹/month)
              </label>
              <input
                type="number"
                className="border-2 rounded-lg px-4 py-2 w-full"
                value={room.rent}
                min={0}
                onChange={(e) =>
                  handleRoomDetailChange(idx, "rent", e.target.value)
                }
              />
            </div>
            <div>
              {form.pgDetails.roomDetails.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={() => removeRoomDetail(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={addRoomDetail}
        >
          Add Room Type
        </button>
      </div>

      {/* Photo & Video Upload */}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full md:w-1/2 mt-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Submit PG
        </button>
      </div>
      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Upload Property Images & Videos
            </h3>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Upload Photos
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                multiple
                onChange={(e) => handleFileChange(e, "images")}
              />
              {/* Image previews */}
              <div className="flex flex-wrap mt-3 gap-3">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`preview-${idx}`}
                      className="object-cover w-full h-full rounded shadow"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Video Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Upload Videos
              </label>
              <input
                type="file"
                accept="video/*"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                multiple
                onChange={(e) => handleFileChange(e, "videos")}
              />
              {/* Video previews */}
              <div className="flex flex-wrap mt-3 gap-3">
                {uploadedVideos.map((vid, idx) => (
                  <div key={idx} className="relative w-24 h-16">
                    <video
                      controls
                      className="object-cover w-full h-full rounded shadow"
                      src={URL.createObjectURL(vid)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
             <button
  type="button"
  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  disabled={uploading}
  onClick={handleUploadFiles}
>
  {uploading ? "Uploading..." : "Confirm Uploads"}
</button>
{uploadMessage && (
  <div className="text-center text-sm text-green-700 mt-3">{uploadMessage}</div>
)}

            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PGCoLivingForm;
