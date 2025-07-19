import { createSlice } from '@reduxjs/toolkit';
import { fetchDistrictsByState } from '../actions/districtActions';

const districtSlice = createSlice({
  name: 'districts',
  initialState: {
    districts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistrictsByState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistrictsByState.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(fetchDistrictsByState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default districtSlice.reducer;
