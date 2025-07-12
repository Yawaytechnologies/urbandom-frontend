import React from "react";
import Overview from "../components/PropertyOverview/Home.jsx";
import NavigationBar from "../components/PropertyOverview/NavigationBar.jsx"; // ✅ new import

const PropertyOverviewPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Overview Section */}
      <Overview />
      {/* Navigation Tabs Header */}
      <NavigationBar />
    </div>
  );
};

export default PropertyOverviewPage;
