// src/redux/buyPageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProperties } from '../actions/buyPageActions';

const initialState = {
  properties: [], // Array to hold all properties
  isLoading: false,
  error: null,
};

const buyPageSlice = createSlice({
  name: 'buyPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Properties Pending (loading state)
      .addCase(fetchAllProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      // Fetch All Properties Fulfilled (success state)
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;  // Store the fetched properties
      })
      // Fetch All Properties Rejected (error state)
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Set the error message

        
      });
  },
});

export default buyPageSlice.reducer;
