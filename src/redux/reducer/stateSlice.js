import { createSlice } from '@reduxjs/toolkit';
import { fetchStatesByCountry } from '../actions/stateActions';

const stateSlice = createSlice({
  name: 'states',
  initialState: {
    states: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatesByCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatesByCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStatesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stateSlice.reducer;
