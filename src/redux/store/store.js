// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice';  // Import the property slice
import overviewHomeReducer from '../reducer/overviewHomeSlice';  // Import the overviewHome slice

const store = configureStore({
  reducer: {
    property: propertyReducer, // Your property slice
    buyPage: buyPageReducer, // The new buyPage slice to handle the buy page data
    property: propertyReducer,  // Property reducer for managing property data
    overviewHome: overviewHomeReducer,  // OverviewHome reducer for managing overview property data
  },
});

export default store;
