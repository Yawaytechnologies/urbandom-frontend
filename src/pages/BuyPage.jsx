// BuyPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../components/common/HeroSection';
import { fetchAllProperties, fetchProminentProperties } from '../redux/actions/buyPageActions';
import FeaturedProperties from '../components/Buypage/FeaturedProperties';
import ProminentProjects from '../components/Buypage/ProminentProjects';

const BuyPage = () => {
  const dispatch = useDispatch();

  const { properties, isLoading, error } = useSelector((state) => state.buyPage);

  useEffect(() => {
    dispatch(fetchAllProperties());
    dispatch(fetchProminentProperties());
  }, [dispatch]);

  return (
    <>
      <HeroSection tabType="buy" />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <FeaturedProperties properties={properties} />
          <ProminentProjects /> 
        </>
      )}
    </>
  );
};

export default BuyPage;