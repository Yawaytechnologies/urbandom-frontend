import React from "react";
import Overview from "../components/PropertyOverview/Home.jsx";
import ContactForm from "../components/PropertyOverview/ContactForm.jsx";
import HighlightsSection from "../components/PropertyOverview/HighlightsSection.jsx";
import NavigationBar from "../components/PropertyOverview/NavigationBar.jsx";
import AmenitiesSection from "../components/PropertyOverview/AmenitiesSection.jsx";
import AroundProject from "../components/PropertyOverview/AroundProject.jsx";
import ProjectOverview from "../components/PropertyOverview/ProjectOverview.jsx";
import AboutProject from "../components/PropertyOverview/AboutProject.jsx";
import PropertyMap from "../components/PropertyOverview/PropertyMap.jsx";

const PropertyOverviewPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] pt-[20px]">
      {/* Overview Section */}
      <div id="overview-home" className="scroll-mt-[140px]">
        <Overview />
      </div>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-[50px] z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full overflow-hidden">
          <NavigationBar />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_24rem] max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-6 gap-8">
        {/* LEFT: Scrollable Sections */}
        <div
          className="overflow-y-auto max-h-[calc(100vh-100px)] pr-4 pl-2 pt-4 space-y-6 rounded-md"
          style={{ scrollBehavior: "smooth" }}
        >
          <div id="highlights" className="scroll-mt-[180px]">
            <HighlightsSection />
          </div>

          <div id="amenities" className="scroll-mt-[180px]">
            <AmenitiesSection />
          </div>

          <div
            id="around"
            className="bg-white p-6 rounded-xl shadow-md scroll-mt-[180px] min-h-[60vh]"
          >
            <h3 className="text-lg font-semibold mb-2">Around This Project</h3>
            <AroundProject />
          </div>

          <div
            id="more-about"
            className="bg-white p-6 rounded-xl shadow-md scroll-mt-[180px] min-h-[60vh]"
          >
            <h3 className="text-lg font-semibold mb-2">More About Project</h3>
            <ProjectOverview />
          </div>

          <div
            id="about"
            className="bg-white p-4 rounded-xl shadow-md scroll-mt-[180px] min-h-[50vh]"
          >
            <h3 className="text-lg font-semibold mb-2"> About Project</h3>
            <AboutProject />
          </div>

          <div
            id="property-map"
            // className="bg-white p-6 rounded-xl shadow-md scroll-mt-[180px] min-h-[60vh]"
          >
            <h3 className="text-lg font-semibold mb-2">Property Map</h3>
            <PropertyMap />
          </div>

          {/* Mobile/Tablet Contact Form */}
          <div className="block lg:hidden">
            <div className="bg-white rounded-xl shadow-md p-4">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* RIGHT: Sticky Contact Form for Desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-[110px] max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="bg-white rounded-xl shadow-md p-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverviewPage;
