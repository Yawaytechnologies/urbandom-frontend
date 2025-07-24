// src/redux/slices/overviewHomeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchOverviewHomeData } from '../actions/overviewHomeActions';

const initialState = {
  dataMap: {},       // Store property data by ID
  loading: false,
  error: null,
};

const overviewHomeSlice = createSlice({
  name: 'overviewHome',
  initialState,
  reducers: {
    clearOverviewData: (state) => {
      state.dataMap = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverviewHomeData.fulfilled, (state, action) => {
        state.loading = false;
        const property = action.payload;
        state.dataMap[property._id] = property; // Store using ID
      })
      .addCase(fetchOverviewHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOverviewData } = overviewHomeSlice.actions;

export default overviewHomeSlice.reducer;
