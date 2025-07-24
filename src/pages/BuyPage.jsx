// BuyPage.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeroSection from '../components/common/HeroSection';
import {fetchNewsAndArticles} from '../redux/actions/buyPageActions';
import FeaturedProperties from '../components/Buypage/FeaturedProperties';
import ProminentProjects from '../components/Buypage/ProminentProjects';
import SellPropertySection from '../components/Buypage/SellPropertySection';
import FeaturedDevelopers from '../components/Buypage/FeaturedDevelopers';
import NewsAndArticles from '../components/Buypage/NewsAndArticles';
import NewlyAddedProperties from '../components/Buypage/NewlyAddedProperties';


const BuyPage = () => {
  const dispatch = useDispatch();

  // const { properties, isLoading, error } = useSelector((state) => state.buyPage);

  useEffect(() => {
    // dispatch(fetchAllProperties());
    // dispatch(fetchProminentProperties());
    // dispatch(fetchFeaturedDevelopers());
    dispatch(fetchNewsAndArticles());
    // dispatch(fetchNewlyAddedPropertiesAction());
  }, [dispatch]);

  return (
    <>
      <HeroSection tabType="buy" />
      { (
        <>
          <FeaturedProperties  />
          <ProminentProjects /> 
          <FeaturedDevelopers/>
          <NewlyAddedProperties/>
          <SellPropertySection/>
          <NewsAndArticles/>
        </>
      )}
    </>
  );
};

export default BuyPage;