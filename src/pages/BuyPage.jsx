// src/pages/BuyPage.jsx
import React from 'react';
import HeroSection from '../components/common/HeroSection';
import FeaturedProperties from '../components/BuyPage/FeaturedProperties';
import ProminentProjects from '../components/BuyPage/ProminentProjects'; 
import TopHighlighted from '../components/Buypage/TopHighlighted';
import FeaturedDevelopers from '../components/Buypage/FeaturedDevelopers';
// import TrustedDevelopers from '../components/Buypage/TrustedDevelopers';
// import HighDemandProjects from '../components/Buypage/HighDemandProjects';
import RecommendedSellers from '../components/Buypage/RecommendedSellers';
import NewlyAddedProperties from '../components/Buypage/NewlyAddedProperties';
import SellPropertySection from '../components/Buypage/SellPropertySection';
import NewsAndArticles from '../components/Buypage/NewsAndArticles';

const BuyPage = () => {
  return (
    <>
      {/* Hero Section with buy tab */}
      <HeroSection tabType="buy" />

      {/* Featured Properties Section */}
      <FeaturedProperties />

      {/* Prominent Projects Section */}
      <ProminentProjects />

      <TopHighlighted/>

      {/* featured developer section */}
      <FeaturedDevelopers/>

      {/* truested developer */}

      {/* <TrustedDevelopers/> */}

      {/* High demand */}
      {/* <HighDemandProjects/> */}

      <RecommendedSellers/>

      <NewlyAddedProperties/>

      <SellPropertySection/>

      <NewsAndArticles/>


    </>
  );
};

export default BuyPage;