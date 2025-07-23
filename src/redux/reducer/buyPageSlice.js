// src/redux/buyPageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllProperties,
  fetchFeaturedDevelopers,
  fetchProminentProperties,
  fetchNewsAndArticles,
  fetchNewlyAddedPropertiesAction,  
} from '../actions/buyPageActions';  // Ensure proper import


const initialState = {
  properties: [],  // Array to hold all properties
  prominentProperties: [],  // Array to hold prominent properties
  featuredDevelopers: [],
  newlyAddedProperties:[],
  newsAndArticles: [],
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
      })

      // Fetch Featured Developers Pending (loading state)
      .addCase(fetchFeaturedDevelopers.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      // Fetch Featured Developers Fulfilled (success state)
      .addCase(fetchFeaturedDevelopers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredDevelopers = action.payload;  // Store the fetched developers
      })
      // Fetch Featured Developers Rejected (error state)
      .addCase(fetchFeaturedDevelopers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Set the error message
      })

      // Fetch Newly Added Properties Pending (loading state)
            .addCase(fetchNewlyAddedPropertiesAction.pending, (state) => {
              state.isLoading = true;
              state.error = null; // Clear previous errors
            })
            // Fetch Newly Added Properties Fulfilled (success state)
            .addCase(fetchNewlyAddedPropertiesAction.fulfilled, (state, action) => {
              state.isLoading = false;
              state.properties = action.payload || []; // If payload is undefined, fall back to empty array
            })
            // Fetch Newly Added Properties Rejected (error state)
            .addCase(fetchNewlyAddedPropertiesAction.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload || 'Error fetching properties'; // Ensure error is defined
            })

      // Fetch News and Articles Pending (loading state)
      .addCase(fetchNewsAndArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      // Fetch News and Articles Fulfilled (success state)
      .addCase(fetchNewsAndArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsAndArticles = action.payload || []; // Ensure payload is defined and fallback to empty array
      })
      // Fetch News and Articles Rejected (error state)
      .addCase(fetchNewsAndArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching news and articles'; // Handle undefined payloads
      });
  },
});

export default buyPageSlice.reducer;
