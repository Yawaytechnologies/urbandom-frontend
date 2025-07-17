// src/redux/actions/buyPageActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import buyPageService from '../../redux/services/buyPageService'; // Import service

// Fetch All Properties
export const fetchAllProperties = createAsyncThunk(
  'buyPage/fetchAllProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await buyPageService.getAllProperties();  // Call the service to get all properties
      return response;  // Return the fetched properties
    } catch (error) {
      console.error("Error in action:", error.message);
      return rejectWithValue(error.message);  // Pass the error to Redux
    }
  }
);

export const fetchProminentProperties = createAsyncThunk(
  'buyPage/fetchProminentProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await buyPageService.getProminentProperties();  // Call the service to get all properties
      return response;  // Return the fetched properties
    } catch (error) {
      console.error("Error in action:", error.message);
      return rejectWithValue(error.message);  // Pass the error to Redux
    }
  }
);
