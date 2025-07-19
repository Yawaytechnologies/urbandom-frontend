import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries } from '../services/locationService';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      return await getCountries();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
