// import React, { useState, useRef, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa";

// const ListingMain = ({ activeSubmenu }) => {
//   const totalProperties = 3;
//   const showingProperties = 1;

//   const [priceRange, setPriceRange] = useState([0, 35000]);
//   const [showPriceRange, setShowPriceRange] = useState(false);
//   const [propertyId, setPropertyId] = useState("");
//   const [showPropertyIdDropdown, setShowPropertyIdDropdown] = useState(false);

//   const resetFilters = () => {
//     setPriceRange([0, 35000]);
//     setShowPriceRange(false);
//     setPropertyId("");
//     setShowPropertyIdDropdown(false);
//   };

//   return (
//     <div className="p-4 min-h-screen bg-[#f5f5f5]">
//       <div className="bg-gradient-to-r from-[#e9ddff] to-[#f4eaff] rounded-[20px] px-6 py-4 shadow-sm border border-[#ecd8ff] max-w-6xl mx-auto transition-all duration-300">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center gap-3">
//             <PropertyIdDropdown
//               value={propertyId}
//               setValue={setPropertyId}
//               show={showPropertyIdDropdown}
//               setShow={setShowPropertyIdDropdown}
//             />
//             <LocalityDropdown />
//             <PropertyTypeDropdown />
//             <SimpleDropdown label="BHK" options={["1 BHK", "2 BHK", "3 BHK"]} />
//             <PriceDropdown
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               showPriceRange={showPriceRange}
//               setShowPriceRange={setShowPriceRange}
//             />
//           </div>
//           <div className="flex items-center gap-6 text-sm">
//             <button onClick={resetFilters} className="text-black font-semibold">
//               RESET
//             </button>
//           </div>
//         </div>
//         <div className="mt-3 text-sm font-semibold text-black">
//           Showing{" "}
//           <span className="text-purple-600">
//             {showingProperties} out of {totalProperties}
//           </span>{" "}
//           properties
//         </div>
//       </div>

//      <div className="bg-white rounded-xl border border-gray-200 w-full max-w-4xl mx-auto shadow-sm mb-6 mt-4 overflow-hidden">
//   <div className="text-sm text-gray-600 px-4 pt-3">ID:17707798</div>

//   <div className="flex flex-col md:flex-row px-4 py-2">
//     <div className="w-full md:w-40 h-50 flex items-center justify-center bg-gray-100 rounded-md">
//       <img
//         src="/sample.jpg"
//         alt="Building"
//         className="h-50 w-40 "
//       />
//     </div>

//     <div className="flex-1 pl-0 md:pl-5">
//       <div className="flex justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">₹ 20,000</h2>
//           <p className="text-base font-semibold mt-1">1 BHK Apartment</p>
//           <p className="text-sm text-gray-500 mt-1">
//             1400 sq. ft. &nbsp;&nbsp;·&nbsp;&nbsp; Fully Furnished
//           </p>
//         </div>
//         <div className="flex flex-col items-end">
//           <button className="text-xs text-purple-600 font-semibold">
//             +Advanced Details
//           </button>
//           <div className="flex items-center gap-1 mt-2">
//             <span className="text-green-500 text-lg">✔</span>
//             <span className="text-sm font-medium text-green-600">ACTIVE</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 mt-5 bg-violet-50 px-4 py-3 rounded-md">
//         <div>
//           <p className="text-xs text-gray-400">Last Added</p>
//           <p>3 Jul 2025</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-400">Expiring On</p>
//           <p>1 Sept 2025</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-400">Visibility</p>
//           <p className="text-red-500">Low (Free Plan)</p>
//         </div>
//       </div>

//       <div className="mt-4 flex justify-end">
//         <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-semibold">
//           UPGRADE
//         </button>
//       </div>
//     </div>
//   </div>

//   <div className="px-4 mt-4">
//     <p className="text-sm">
//       Your listing score: <span className="font-bold">50%</span>
//     </p>
//     <div className="w-full h-2 bg-gray-200 rounded mt-1">
//       <div
//         className="h-2 bg-purple-600 rounded"
//         style={{ width: "50%" }}
//       ></div>
//     </div>
//     <p className="text-sm mt-2">
//       Improve listing score to sell faster <span className="ml-1">😊</span>
//     </p>
//   </div>

//   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-5 text-sm">
//     <div className="bg-violet-50 p-3 rounded-md flex items-center justify-between">
//       <div>
//         <p className="text-green-600 font-semibold">↑ 15% listing score</p>
//         <p className="text-gray-700">Add Photos</p>
//       </div>
//       <span className="text-2xl text-violet-500">›</span>
//     </div>
//     <div className="bg-violet-50 p-3 rounded-md flex items-center justify-between">
//       <div>
//         <p className="text-green-600 font-semibold">↑ 10% listing score</p>
//         <p className="text-gray-700">Verify now</p>
//       </div>
//       <span className="text-2xl text-violet-500">›</span>
//     </div>
//     <div className="bg-violet-50 p-3 rounded-md flex items-center justify-between">
//       <div>
//         <p className="text-green-600 font-semibold">↑ upto 30% listing score</p>
//         <p className="text-gray-700">Add details</p>
//       </div>
//       <span className="text-2xl text-violet-500">›</span>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// // ✅ PropertyId Dropdown-style Filter
// const PropertyIdDropdown = ({ value, setValue, show, setShow }) => {
//   const ref = useRef();
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setShow(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setShow(!show)}
//         className="bg-white border border-gray-300 text-sm text-black px-4 py-1.5 rounded-xl shadow-sm hover:bg-gray-100 flex items-center gap-2 transition"
//       >
//         Property Id
//         <FaChevronDown
//           className={`text-xs transition-transform ${
//             show ? "rotate-180 text-purple-600" : ""
//           }`}
//         />
//       </button>
//       {show && (
//         <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-md p-4">
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             placeholder="Search for Property Id"
//             className="w-full px-3 py-2 mb-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
//           />
//           <button className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded font-semibold w-full">
//             Go
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ✅ LocalityDropdown remains unchanged
// const LocalityDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-white border border-gray-300 text-sm text-black px-4 py-1.5 rounded-xl shadow-sm hover:bg-gray-100 flex items-center gap-2 transition"
//       >
//         Locality
//         <FaChevronDown
//           className={`text-xs transition-transform ${
//             open ? "rotate-180 text-purple-600" : ""
//           }`}
//         />
//       </button>
//       {open && (
//         <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-md p-3">
//           <input
//             type="text"
//             placeholder="Search for Locality"
//             className="w-full px-3 py-2 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
//           />
//           <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
//             <input type="checkbox" className="accent-purple-600" />
//             Mangadu (1)
//           </label>
//         </div>
//       )}
//     </div>
//   );
// };

// // ✅ Property Type pills
// const PropertyTypeDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const ref = useRef();
//   const options = ["Apartment", "Independent House", "Villa", "Studio"];
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   const toggleSelection = (type) => {
//     setSelectedTypes((prev) =>
//       prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//     );
//   };
//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-white border border-gray-300 text-sm text-black px-4 py-1.5 rounded-xl shadow-sm hover:bg-gray-100 flex items-center gap-2 transition"
//       >
//         Property Type
//         <FaChevronDown
//           className={`text-xs transition-transform ${
//             open ? "rotate-180 text-purple-600" : ""
//           }`}
//         />
//       </button>
//       {open && (
//         <div className="absolute z-10 mt-2 w-[500px] bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-wrap gap-3">
//           {options.map((option) => {
//             const isSelected = selectedTypes.includes(option);
//             return (
//               <span
//                 key={option}
//                 onClick={() => toggleSelection(option)}
//                 className={`text-sm px-4 py-2 rounded-full cursor-pointer transition border ${
//                   isSelected
//                     ? "bg-purple-100 border-purple-500 text-purple-700 font-semibold"
//                     : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {option}
//               </span>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// // ✅ Price Filter with show only after drag
// const PriceDropdown = ({
//   priceRange,
//   setPriceRange,
//   showPriceRange,
//   setShowPriceRange,
// }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   const handleSliderChange = (e) => {
//     const newValue = parseInt(e.target.value, 10);
//     setPriceRange([0, newValue]);
//     setShowPriceRange(true);
//   };
//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-white border border-gray-300 text-sm text-black px-4 py-1.5 rounded-xl shadow-sm hover:bg-gray-100 flex items-center gap-2 transition"
//       >
//         {showPriceRange ? `0–${priceRange[1] / 1000} K` : "Price"}
//         <FaChevronDown
//           className={`text-xs transition-transform ${
//             open ? "rotate-180 text-purple-600" : ""
//           }`}
//         />
//       </button>
//       {open && (
//         <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-md p-4">
//           <div className="flex justify-between text-sm text-gray-700 font-semibold mb-2 px-1">
//             <span>0</span>
//             <span>35 K</span>
//           </div>
//           <input
//             type="range"
//             min={0}
//             max={35000}
//             step={1000}
//             value={priceRange[1]}
//             onChange={handleSliderChange}
//             className="w-full accent-purple-600"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // ✅ BHK dropdown
// const SimpleDropdown = ({ label, options }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-white border border-gray-300 text-sm text-black px-4 py-1.5 rounded-xl shadow-sm hover:bg-gray-100 flex items-center gap-2 transition"
//       >
//         {label}
//         <FaChevronDown
//           className={`text-xs transition-transform ${
//             open ? "rotate-180 text-purple-600" : ""
//           }`}
//         />
//       </button>
//       {open && (
//         <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md p-3">
//           {options.map((option) => (
//             <div
//               key={option}
//               className="text-sm text-gray-700 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-md"
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListingMain;
