import { createSlice } from '@reduxjs/toolkit';
import { fetchOverviewHomeData } from '../actions/overviewHomeActions';

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
        state.error = null;
      })
      .addCase(fetchOverviewHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOverviewHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default overviewHomeSlice.reducer;
