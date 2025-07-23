import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Property Types from the API
export const fetchPropertyTypes = createAsyncThunk(
  'property/fetchPropertyTypes',
  async (_, { rejectWithValue }) => {
    try {
      // Make an API call to your backend to fetch property types
      const response = await axios.get('http://localhost:5001/api/property/types');
      return response.data;  // Return the data to be stored in Redux state
    } catch (error) {
      // Handle errors and return error message to be used in rejected action
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch Listing Types from the API (if required)
export const fetchListingTypes = createAsyncThunk(
  'property/fetchListingTypes',
  async (_, { rejectWithValue }) => {
    try {
      // Assuming your backend provides this endpoint for listing types
      const response = await axios.get('http://localhost:5001/api/property/listing-types');
      return response.data;  // Return the data to be stored in Redux state
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
