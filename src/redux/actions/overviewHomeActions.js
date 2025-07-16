import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Access the VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk to fetch property data
export const fetchOverviewHomeData = createAsyncThunk(
  'overviewHome/fetchOverviewHomeData',
  async (propertyId, { rejectWithValue }) => {
    try {
      // Ensure the propertyId is defined
      if (!propertyId) {
        throw new Error('Property ID is required.');
      }

      // Log the URL and ID to check if it's correct
      console.log(`Fetching property with ID: ${propertyId}`);
      
      // Fetch the property data from the API
      const response = await axios.get(`${API_URL}/property/${propertyId}`);
      return response.data;  // Return the fetched data to be handled in the slice
    } catch (error) {
      console.error("Error fetching property data:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
