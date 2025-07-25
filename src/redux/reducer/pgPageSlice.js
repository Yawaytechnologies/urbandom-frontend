import { createSlice } from '@reduxjs/toolkit';
import { fetchNeighbourhoodPgs } from '../actions/pgPageActions';

const initialState = {
  neighbourhoodPgs:[],
  isLoading: false,
  error: null,
};

const pgPageSlice = createSlice({
  name: 'pgPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Properties Pending (loading state)
      .addCase(fetchNeighbourhoodPgs.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      // Fetch All Properties Fulfilled (success state)
      .addCase(fetchNeighbourhoodPgs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.neighbourhoodPgs = action.payload;  // Store the fetched properties
      })
      // Fetch All Properties Rejected (error state)
      .addCase(fetchNeighbourhoodPgs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Set the error message
      });

  }
});

export default pgPageSlice.reducer;

