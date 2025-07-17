// store.js

import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../reducer/propertySlice';

const store = configureStore({
  reducer: {
      properties: propertyReducer,
  },
});

export default store;
