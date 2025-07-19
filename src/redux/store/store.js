// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice'; // You can keep this if it's required for your property section
import buyPageReducer from '../reducer/buyPageSlice'; // Import the buyPage slice
import countryReducer from '../reducer/countrySlice';
import stateReducer from '../reducer/stateSlice';
import districtReducer from '../reducer/districtSlice';
const store = configureStore({
  reducer: {
    property: propertyReducer, // Your property slice
    buyPage: buyPageReducer, // The new buyPage slice to handle the buy page data
     countries: countryReducer,
    states: stateReducer,
    districts: districtReducer,
  },
});

export default store;
