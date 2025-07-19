import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDistrictsByState } from '../services/locationService';

export const fetchDistrictsByState = createAsyncThunk(
  'districts/fetchDistrictsByState',
  async (stateId, { rejectWithValue }) => {
    try {
      return await getDistrictsByState(stateId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
