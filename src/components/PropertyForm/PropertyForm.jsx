import { useState } from "react";
import BasicDetails from "./BasicDetails";
import PropertyDetails from "./PropertyDetails";
import RoomDetails from "./RoomDetails";
import PriceDetails from "./PriceDetails";
import PhotoUpload from "./PhotoUpload";
import Pattern from '../../assets/images/hosing.jpg';


const PropertyForm = () => {
  const [step, setStep] = useState(1);

  // Top-level selectors
  const [propertyType, setPropertyType] = useState("Residential"); // "Residential" | "Commercial"
  const [listingType, setListingType] = useState("Rent"); // "Rent" | "Sell" | "PG / Co-living"

  // Location
  const [country, setCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [district, setDistrict] = useState("");
  const [locality, setLocality] = useState("");

  // All possible fields (will be used conditionally)
  // Commercial/Residential step2
  const [subtype, setSubtype] = useState(""); // property type (Apartment/Office/Plot etc)
  const [society, setSociety] = useState(""); // building/project/society
  const [zoneType, setZoneType] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sq.ft.");
  const [ownership, setOwnership] = useState("");
  // Room details
  const [bhk, setBhk] = useState(""); // for residential only
  const [area, setArea] = useState(""); // built-up area
  const [furnishType, setFurnishType] = useState("");
  const [shareWithAgents, setShareWithAgents] = useState(false);
  // Price
  const [rent, setRent] = useState("");
  const [customSecurity, setCustomSecurity] = useState("");
  const [security, setSecurity] = useState("None");

  // PG/Co-living details
  const [totalBeds, setTotalBeds] = useState("");           
  const [bestSuitedFor, setBestSuitedFor] = useState("");   
  const [mealsAvailable, setMealsAvailable] = useState(""); 
  const [noticePeriod, setNoticePeriod] = useState("");     
  const [lockInPeriod, setLockInPeriod] = useState("");     
  const [commonAreas, setCommonAreas] = useState([]);       
  const [rooms, setRooms] = useState([{ roomType: "", rent: "", security: "" }]);
  const [photos, setPhotos] = useState([]);

  // For step 1: go next
  const handleNext = () => setStep(2);

  // For RoomDetails PG submit: go to photo upload
  const handleRoomOrPGPost = () => setStep(5);

  // For price submit: go to photo upload
  const handlePriceSubmit = () => setStep(5);

  // Final photo upload submit
  const handlePhotoContinue = () => {
    // Here, collect all form data for submit!
    alert("Property Posted Successfully! 🎉");
    // Optionally, reset or redirect
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center bg-primary/20">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          {/* All your step components, unchanged */}
          {step === 1 && (
            <BasicDetails
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              listingType={listingType}
              setListingType={setListingType}
              country={country}
              setCountry={setCountry}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              district={district}
              setDistrict={setDistrict}
              locality={locality}
              setLocality={setLocality}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <PropertyDetails
              propertyType={propertyType}
              listingType={listingType}
              subtype={subtype}
              setSubtype={setSubtype}
              society={society}
              setSociety={setSociety}
              locality={locality}
              setLocality={setLocality}
              zoneType={zoneType}
              setZoneType={setZoneType}
              availableFrom={availableFrom}
              setAvailableFrom={setAvailableFrom}
              plotArea={plotArea}
              setPlotArea={setPlotArea}
              areaUnit={areaUnit}
              setAreaUnit={setAreaUnit}
              ownership={ownership}
              setOwnership={setOwnership}
              totalBeds={totalBeds}
              setTotalBeds={setTotalBeds}
              bestSuitedFor={bestSuitedFor}
              setBestSuitedFor={setBestSuitedFor}
              mealsAvailable={mealsAvailable}
              setMealsAvailable={setMealsAvailable}
              noticePeriod={noticePeriod}
              setNoticePeriod={setNoticePeriod}
              lockInPeriod={lockInPeriod}
              setLockInPeriod={setLockInPeriod}
              commonAreas={commonAreas}
              setCommonAreas={setCommonAreas}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && propertyType === "Residential" && (
            <RoomDetails
              pgMode={listingType === "PG / Co-living"}
              bhk={bhk}
              setBhk={setBhk}
              area={area}
              setArea={setArea}
              areaUnit={areaUnit}
              setAreaUnit={setAreaUnit}
              furnishType={furnishType}
              setFurnishType={setFurnishType}
              shareWithAgents={shareWithAgents}
              setShareWithAgents={setShareWithAgents}
              rooms={rooms}
              setRooms={setRooms}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
              onSubmit={handleRoomOrPGPost}
            />
          )}
          {((step === 3 && propertyType === "Commercial") || step === 4) && (
            <PriceDetails
              propertyType={propertyType}
              listingType={listingType}
              rent={rent}
              setRent={setRent}
              security={security}
              setSecurity={setSecurity}
              customSecurity={customSecurity}
              setCustomSecurity={setCustomSecurity}
              onBack={() =>
                propertyType === "Commercial"
                  ? setStep(2)
                  : setStep(3)
              }
              onSubmit={handlePriceSubmit}
            />
          )}
          {step === 5 && (
            <PhotoUpload
              photos={photos}
              setPhotos={setPhotos}
              onBack={() => {
                if (propertyType === "Commercial") setStep(4);
                else setStep(4);
              }}
              onContinue={handlePhotoContinue}
            />
          )}
        </div>
      </div>

      {/* Right: Blurred Image + Overlay Text */}
      <div className="hidden md:block flex-1 relative overflow-hidden">
        {/* Blurred background image */}
        <img
          src={Pattern}
          alt="Property"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105"
          style={{ zIndex: 1 }}
        />
        {/* Optional dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60  z-10"></div>
        {/* Headline and subtext */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">
            Find Your Perfect Home
          </h2>
          <p className="text-lg text-white font-medium drop-shadow mb-8">
            Rent &bull; Sell &bull; PG/Co-living <br />
            Discover property options tailored just for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
