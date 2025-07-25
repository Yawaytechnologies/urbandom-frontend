import React from 'react';
import HeroSection from '../components/common/HeroSection';
import HomeAtFirstSight from '../components/PgPage/HomeAtFirstSight';
import PGBenefitsSection from '../components/PgPage/PGBenefitsSection';
import NeighbourhoodPGs from '../components/PgPage/NeighbourhoodPGs';
import NewsAndArticles from '../components/PgPage/NewsAndArticles';

const PgPage = () => {


     return (
    <div>
      <HeroSection tabs="pg" />
      <HomeAtFirstSight/>
      <PGBenefitsSection/>
      <NeighbourhoodPGs/>
      <NewsAndArticles/>
      
    </div>
  );
};

export default PgPage;