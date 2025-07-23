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

// Fetch Developers from the API
export const fetchFeaturedDevelopers = createAsyncThunk(
  'buyPage/fetchFeaturedDevelopers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await buyPageService.getFeaturedDevelopers(); 
      return response;  // Return the fetched properties
    } catch (error) {
      console.error("Error in action:", error.message);
      return rejectWithValue(error.message);  // Pass the error to Redux
    }
  }
);

// Fetch newly added properties for Rent page
export const fetchNewlyAddedPropertiesAction = createAsyncThunk(
  'buyPage/fetchNewlyAddedProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await buyPageService.getNewlyAddedProperties(); // Call the method from rentPageService
      return response;
    } catch (error) {
      console.error("Error in action:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch News and Articles section
export const fetchNewsAndArticles = createAsyncThunk(
  'buyPage/fetchNewsAndArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await buyPageService.getNewsAndArticles(); // Call the method from newsAndArticleService
      return response;
    } catch (error) {
      console.error("Error in action:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

