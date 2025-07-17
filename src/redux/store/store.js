// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice';  // Import the property slice
import overviewHomeReducer from '../reducer/overviewHomeSlice';  // Import the overviewHome slice
import rentPageReducer from '../reducer/rentPageSlice';

const store = configureStore({
  reducer: {
    property: propertyReducer, // Your property slice
    buyPage: buyPageReducer, // The new buyPage slice to handle the buy page data
    // },
});

export default store;
