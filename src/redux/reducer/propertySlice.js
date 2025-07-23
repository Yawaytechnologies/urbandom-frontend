import { createSlice } from '@reduxjs/toolkit';
import { fetchPropertyTypes, fetchListingTypes } from '../actions/propertyAction';  // Import the actions

const initialState = {
  propertyTypes: [],
  listingTypes: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Property Types Fetching
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.loading = true;   
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyTypes = action.payload; // Store the fetched property types
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch property types'; // Handle error
      })

      // Handle Listing Types Fetching
      .addCase(fetchListingTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListingTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.listingTypes = action.payload;  // Store the fetched listing types
      })
      .addCase(fetchListingTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch listing types'; // Handle error
      });
  },
});

export default propertySlice.reducer;
