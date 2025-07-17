// src/pages/BuyPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../components/common/HeroSection';  // Correct import
import { fetchAllProperties } from '../redux/actions/buyPageActions';  // Correct import

import FeaturedProperties from '../components/Buypage/FeaturedProperties';  // Correct import

const BuyPage = () => {
  const dispatch = useDispatch();

  const { properties, isLoading, error } = useSelector((state) => state.buyPage);

  useEffect(() => {
    // Dispatch action to fetch all properties
    dispatch(fetchAllProperties());
  }, [dispatch]);  // Re-run effect when the component mounts

  return (
    <>
      <HeroSection tabType="buy" />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>  // Display error message
      ) : (
        <FeaturedProperties properties={properties} /> 
      )}
    </>
  );
};

export default BuyPage;
