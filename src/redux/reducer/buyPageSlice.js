// src/redux/buyPageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProperties, fetchProminentProperties } from '../actions/buyPageActions';

const initialState = {
  properties: [],  // Array to hold all properties
  prominentProperties: [],  // Array to hold prominent properties
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
      })
      // Fetch Prominent Properties Pending (loading state)
      .addCase(fetchProminentProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      // Fetch Prominent Properties Fulfilled (success state)
      .addCase(fetchProminentProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prominentProperties = action.payload;  // Store the fetched prominent properties
      })
      // Fetch Prominent Properties Rejected (error state)
      .addCase(fetchProminentProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Set the error message
      });
  },
});

export default buyPageSlice.reducer;
