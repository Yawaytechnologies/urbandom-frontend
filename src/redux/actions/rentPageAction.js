import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewlyAddedProperties } from '../services/rentPageService'; // Make sure you have a service for rent page

// Fetch newly added properties for Rent page
export const fetchNewlyAddedPropertiesAction = createAsyncThunk(
  'rentPage/fetchNewlyAddedProperties',
  async (_, { rejectWithValue }) => {
    try {
      const properties = await fetchNewlyAddedProperties();
      return properties;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
