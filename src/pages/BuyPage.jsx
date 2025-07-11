// src/pages/BuyPage.jsx
import React from 'react';
import HeroSection from '../components/common/HeroSection';
import FeaturedProperties from '../components/BuyPage/FeaturedProperties';
import ProminentProjects from '../components/BuyPage/ProminentProjects'; // New import
import CarouselGallery from '../components/Buypage/CarouselGallery';

const BuyPage = () => {
  return (
    <>
      {/* Hero Section with buy tab */}
      <HeroSection tabType="buy" />

      {/* Featured Properties Section */}
      <FeaturedProperties />

      {/* Prominent Projects Section */}
      <ProminentProjects />

      <CarouselGallery/>
    </>
  );
};

export default BuyPage;