// src/pages/BuyPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../components/common/HeroSection';  // Correct import
import { fetchAllProperties, fetchProminentProperties } from '../redux/actions/buyPageActions';  // Correct import

import FeaturedProperties from '../components/Buypage/FeaturedProperties';  // Correct import
import ProminentProjects from '../components/Buypage/ProminentProjects';  // Correct import

const BuyPage = () => {
  const dispatch = useDispatch();

  const { properties, isLoading, error, prominentProperties } = useSelector((state) => state.buyPage);

  useEffect(() => {
    // Dispatch actions to fetch all properties and prominent properties
    dispatch(fetchAllProperties());
    dispatch(fetchProminentProperties());
  }, [dispatch]);  // Re-run effect when the component mounts

  return (
    <>
      <HeroSection tabType="buy" />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>  // Display error message
      ) : (
        <>
          <FeaturedProperties properties={properties} />
          <ProminentProjects properties={prominentProperties} />  {/* Display the prominent properties */}
        </>
      )}
    </>
  );
};

export default BuyPage;
