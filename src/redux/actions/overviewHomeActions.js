// src/redux/actions/overviewHomeActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import overviewHomeService from '../services/overviewHomeService';

export const fetchOverviewHomeData = createAsyncThunk(
  'overviewHome/fetchOverviewHomeData',
  async (propertyId, { rejectWithValue }) => {
    try {
      const data = await overviewHomeService.fetchOverviewHomeDataById(propertyId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch overview');
    }
  }
);
