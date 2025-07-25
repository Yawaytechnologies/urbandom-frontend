import { createAsyncThunk } from '@reduxjs/toolkit';
import pgPageService from '../services/pgPageService' // Make sure you import the rentPageService


// Fetch newly added properties for Rent page
export const fetchNeighbourhoodPgs = createAsyncThunk(
  'pgPage/fetchNeighbourhoodPgs',
  async (_, { rejectWithValue }) => {
    try {
      const neighbourhoodPgs = await pgPageService.getNeighbourhoodPgs(); // Call the method from rentPageService
      return neighbourhoodPgs.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);