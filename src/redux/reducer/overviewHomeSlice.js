import { createSlice } from '@reduxjs/toolkit';
import { fetchOverviewHomeData } from '../actions/overviewHomeActions';  // Import from actions

const overviewHomeSlice = createSlice({
  name: 'overviewHome',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverviewHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // Store the fetched property data
      })
      .addCase(fetchOverviewHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  // Store the error if the API call fails
      });
  },
});

export default overviewHomeSlice.reducer;
