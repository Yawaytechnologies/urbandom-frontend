// src/pages/RentPage.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeroSection from '../components/common/HeroSection';
import NewlyAddedProperties from '../components/Rentpage/NewlyAddedProperties';
import RecommendedSellers from '../components/Rentpage/RecommendedSellers';
import {  fetchRecommendedSellersAction,fetchNewsAndArticlesAction} from '../redux/actions/rentPageAction';  // Import the action
import NewsAndArticles from '../components/Rentpage/NewsAndArticles';
import SellPropertySection from '../components/Rentpage/SellPropertySection';

const RentPage = () => {
  const dispatch = useDispatch();
   

  useEffect(() => {
     
    dispatch(fetchRecommendedSellersAction());
    dispatch(fetchNewsAndArticlesAction());
  }, [dispatch]);

 

  return (
    <div>
      <HeroSection tabType="rent" />
      {/* Pass the properties to the NewlyAddedProperties component */}
      <NewlyAddedProperties  />
      <RecommendedSellers/>
      <SellPropertySection/>
      <NewsAndArticles/>
    </div>
  );
};

export default RentPage;
