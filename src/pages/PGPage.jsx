import React from "react";
import HeroSection from "../components/common/HeroSection";
import PGOverview from "../components/PG-Coliving/pgOverview"; 
import TopPGSlider from "../components/PG-Coliving/PGsliders";
import CollectionsSection from "../components/PG-Coliving/pgHandpicked";
import EstablishmentsSection from "../components/PG-Coliving/PGestablishments";
import NewsArticlesSection from "../components/PG-Coliving/PGNews";
export default function PGPage() {
  return (
    <>
     
      <HeroSection/>
      <PGOverview />
      <CollectionsSection />
      <TopPGSlider/>
      <EstablishmentsSection />
      <NewsArticlesSection />
      
    </>
  );
}
