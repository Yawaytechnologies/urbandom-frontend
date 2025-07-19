// src/actions/stateActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStatesByCountry } from '../services/locationService';

// Async thunk to fetch states by selected country
export const fetchStatesByCountry = createAsyncThunk(
  'states/fetchStatesByCountry',
  async (countryId, { rejectWithValue }) => {
    try {
      return await getStatesByCountry(countryId);
    } catch (err) {
      // Unified error handling
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// If you need more actions for create, update, delete, add them below!
