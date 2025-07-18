// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice';  // Import the property slice
import overviewHomeReducer from '../reducer/overviewHomeSlice';  // Import the overviewHome slice
import rentPageReducer from '../reducer/rentPageSlice';
import buyPageReducer from '../reducer/buyPageSlice';  // Import the buyPage slice



const store = configureStore({
  reducer: {
    property: propertyReducer, // Your property slice
    overviewHome: overviewHomeReducer, // OverviewHome reducer for managing overview property data
    rentPage: rentPageReducer,
    buyPage: buyPageReducer,
  },
});

export default store;
