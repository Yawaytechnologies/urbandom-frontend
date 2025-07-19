import React, { useState } from "react";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import EnquiryMain from "../components/Dashboard/EnquiryMain";
import ListingMain from "../components/Dashboard/ListingMain";
import DashboardProfile from "../components/Dashboard/DashboardProfile";

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

      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#f7f7ff] pb-[65px]">
        {/* Sidebar: visible on desktop, floating button for mobile/tablet */}
        {activeSection !== "profile" && (
          <DashboardSidebar
            activeSection={activeSection}
            onSubmenuChange={setActiveSubmenu}
          />
        )}

        {/* Main content area */}
        <main
          className="
            flex-1 w-full 
            px-0 pt-4 pb-8
            sm:px-3 sm:pt-6
            md:px-5 md:pt-8
            lg:pt-10 lg:pb-12
            max-w-full
            transition-all
          "
        >
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
