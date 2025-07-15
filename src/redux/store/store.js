// store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice';

const store = configureStore({
  reducer: {
    property: propertyReducer,
  },
});

export default store;
