// src/redux/slices/rentPageSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchNewlyAddedPropertiesAction } from '../actions/rentPageAction';  // Import the action for fetching newly added properties

const initialState = {
  properties: [],  // Array to hold newly added properties for rent
  isLoading: false,
  error: null,
};

const rentPageSlice = createSlice({
  name: 'rentPage',  // Name of the slice
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Newly Added Properties Pending (loading state)
      .addCase(fetchNewlyAddedPropertiesAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Clear previous errors
      })
      // Fetch Newly Added Properties Fulfilled (success state)
      .addCase(fetchNewlyAddedPropertiesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;  // Store the fetched properties
      })
      // Fetch Newly Added Properties Rejected (error state)
      .addCase(fetchNewlyAddedPropertiesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Set the error message
      });
  },
});

export default rentPageSlice.reducer;
