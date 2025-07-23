import { createSlice } from '@reduxjs/toolkit';
import { fetchNewlyAddedPropertiesAction, fetchRecommendedSellersAction, fetchNewsAndArticlesAction } from '../actions/rentPageAction'; // Import the action for fetching news and articles

const initialState = {
  properties: [],  // Array to hold newly added properties for rent
  recommendedSellers: [], // Sellers data
  newsAndArticles: [],
  isLoading: false,
  error: null,
};

const rentPageSlice = createSlice({
  name: 'rentPage', // Name of the slice
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      // Fetch Recommended Sellers Pending (loading state)
      .addCase(fetchRecommendedSellersAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fetch Recommended Sellers Fulfilled (success state)
      .addCase(fetchRecommendedSellersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedSellers = action.payload || []; // Ensure the payload is an array or fallback to empty array
      })
      // Fetch Recommended Sellers Rejected (error state)
      .addCase(fetchRecommendedSellersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching sellers'; // Handle undefined payloads
      })
      // Fetch News and Articles Pending (loading state)
      .addCase(fetchNewsAndArticlesAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fetch News and Articles Fulfilled (success state)
      .addCase(fetchNewsAndArticlesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsAndArticles = action.payload || []; // Ensure payload is defined and fallback to empty array
      })
      // Fetch News and Articles Rejected (error state)
      .addCase(fetchNewsAndArticlesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching news and articles'; // Handle undefined payloads
      });
  },
});

export default rentPageSlice.reducer;
