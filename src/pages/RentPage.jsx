// src/pages/RentPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../components/common/HeroSection';
import NewlyAddedProperties from '../components/Rentpage/NewlyAddedProperties';
import { fetchNewlyAddedPropertiesAction } from '../redux/actions/rentPageAction';  // Import the action

const RentPage = () => {
  const dispatch = useDispatch();
  const { properties, isLoading, error } = useSelector((state) => state.rentPage);  // Access the properties state

  useEffect(() => {
    dispatch(fetchNewlyAddedPropertiesAction());  // Dispatch action to fetch properties
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <HeroSection tabType="rent" />
      {/* Pass the properties to the NewlyAddedProperties component */}
      <NewlyAddedProperties properties={properties} />
    </div>
  );
};

export default RentPage;
