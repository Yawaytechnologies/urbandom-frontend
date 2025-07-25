// src/redux/actions/overviewHomeActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import overviewHomeService from '../services/overviewHomeService';

// Thunk to fetch single property by ID
export const fetchOverviewHomeData = createAsyncThunk(
  'overviewHome/fetchOverviewHomeData',
  async (propertyId, { rejectWithValue }) => {
    try {
      const property = await overviewHomeService.fetchOverviewHomeDataById(propertyId);
      return property;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch property');
    }
  }
);
