import { createSlice } from '@reduxjs/toolkit';
import { createPropertyAsync } from '../actions/propertyAction';

// Initial state for property slice
const initialState = {
  property: null,
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Property slice
const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPropertyAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPropertyAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.property = action.payload; // Store the created property
      })
      .addCase(createPropertyAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Store the error message
      });
  },
});

export default propertySlice.reducer;
