import React from 'react';
import HeroSection from '../components/common/HeroSection';
import NewlyAddedProperties from '../components/Buypage/NewlyAddedProperties';
import RecommendedSellers from '../components/Buypage/RecommendedSellers';
import SellPropertySection from '../components/Buypage/SellPropertySection';
import NewsAndArticles from '../components/Buypage/NewsAndArticles';

const RentPage = () => {
  return (
    <div>
      <HeroSection tabType="rent" />
      <NewlyAddedProperties/>
      <RecommendedSellers/>
      <SellPropertySection/>
      <NewsAndArticles/>
    </div>
  );
};

export default RentPage;
