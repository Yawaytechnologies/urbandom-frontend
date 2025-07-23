// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice'; // You can keep this if it's required for your property section
import countryReducer from '../reducer/countrySlice';
import stateReducer from '../reducer/stateSlice';
import districtReducer from '../reducer/districtSlice';
import rentPageReducer from '../reducer/rentPageSlice';
import buyPageReducer from '../reducer/buyPageSlice';  // Import the buyPage slice
import userLoginReducer from '../reducer/userLoginSlice'
import overviewHomeReducer from '../reducer/overviewHomeSlice';
const store = configureStore({
  reducer: {
    property: propertyReducer, // Your property slice
     countries: countryReducer,
    states: stateReducer,
    districts: districtReducer,
    overviewHome: overviewHomeReducer, // OverviewHome reducer for managing overview property data
    rentPage: rentPageReducer,
    buyPage: buyPageReducer,
    userLogin: userLoginReducer
  },
});

export default store;
