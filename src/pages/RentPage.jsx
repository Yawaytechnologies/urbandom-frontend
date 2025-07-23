// src/pages/RentPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../components/common/HeroSection';
import NewlyAddedProperties from '../components/Rentpage/NewlyAddedProperties';
import RecommendedSellers from '../components/Rentpage/RecommendedSellers';
import { fetchNewlyAddedPropertiesAction, fetchRecommendedSellersAction,fetchNewsAndArticlesAction} from '../redux/actions/rentPageAction';  // Import the action
import NewsAndArticles from '../components/Rentpage/NewsAndArticles';
import SellPropertySection from '../components/Rentpage/SellPropertySection';

const RentPage = () => {
  const dispatch = useDispatch();
  const { properties, isLoading, error } = useSelector((state) => state.rentPage);  // Access the properties state

  useEffect(() => {
    dispatch(fetchNewlyAddedPropertiesAction());  // Dispatch action to fetch properties
    dispatch(fetchRecommendedSellersAction());
    dispatch(fetchNewsAndArticlesAction());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <HeroSection tabType="rent" />
      {/* Pass the properties to the NewlyAddedProperties component */}
      <NewlyAddedProperties properties={properties} />
      <RecommendedSellers/>
      <SellPropertySection/>
      <NewsAndArticles/>
    </div>
  );
};

export default RentPage;
