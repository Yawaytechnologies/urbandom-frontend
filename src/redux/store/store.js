// store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice';
import userAuthReducer from '../reducer/userAuthSlice'; // Import the userAuthSlice

const store = configureStore({
  reducer: {
    property: propertyReducer,
    userAuth: userAuthReducer // Add the userAuthReducer to the store
},
});

export default store;
