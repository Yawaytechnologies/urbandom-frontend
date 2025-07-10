import React, { useState } from "react";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import EnquiryMain from "../components/Dashboard/EnquiryMain.jsx";
import ListingMain from "../components/Dashboard/ListingMain";
import DashboardProfile from "../components/Dashboard/DashboardProfile"; // ✅ Add this

const DashBoard = () => {
  const [activeSection, setActiveSection] = useState("enquiries");
  const [activePromo, setActivePromo] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState("");

  const sampleEnquiries = [
    { id: 1, text: "2 BHK Apartment in Thiru...(RENT)" },
    { id: 2, text: "3 BHK Independent House ...(RENT)" },
    { id: 3, text: "1 BHK Apartment in Manga...(RENT)" },
    { id: 4, text: "2 BHK Flat in Anna Nagar...(RENT)" },
    { id: 5, text: "Studio Apartment in Velachery...(RENT)" },
  ];

  const promoCards = [
    {
      id: 0,
      img: "/assets/self-verify.png",
      bg: "bg-[#f1edff]",
      heading: "Get more Enquiries",
      sub: "on your property with easy Self-Verification",
      btnText: "Self verify now",
      btnColor: "bg-[#5f36ff]",
    },
    {
      id: 1,
      img: "/assets/upgrade-package.png",
      bg: "bg-[#c1f1d6]",
      heading: "Get 30 Enquiries",
      highlighted: "Guaranteed",
      sub: "With Owner Packages",
      btnText: "Upgrade Now",
      btnColor: "bg-[#1ed794]",
    },
  ];

  const handleNext = () => {
    if (activePromo < promoCards.length - 1) setActivePromo((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (activePromo > 0) setActivePromo((prev) => prev - 1);
  };

  return (
    <>
      <DashboardHeader onMenuClick={setActiveSection} />

      <div className="flex bg-[#f3f4f6] min-h-screen pt-10 pl-10">
        {/* ❌ Hide Sidebar when profile is active */}
        {activeSection !== "profile" && (
          <DashboardSidebar
            activeSection={activeSection}
            onSubmenuChange={setActiveSubmenu}
          />
        )}

        <main className="flex-1 px-4 py-6">
          {activeSection === "enquiries" && (
            <EnquiryMain
              activePromo={activePromo}
              handlePrev={handlePrev}
              handleNext={handleNext}
              promoCards={promoCards}
              sampleEnquiries={sampleEnquiries}
              activeSubmenu={activeSubmenu}
            />
          )}

          {activeSection === "listings" && (
            <ListingMain
              activeSubmenu={activeSubmenu}
              promoCards={promoCards}
            />
          )}

          {activeSection === "profile" && <DashboardProfile />}
        </main>
      </div>
    </>
  );
};

export default DashBoard;
