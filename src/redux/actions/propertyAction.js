import { createAsyncThunk } from '@reduxjs/toolkit';
import { createProperty } from '../services/propertyService';

// Create a new property listing
export const createPropertyAsync = createAsyncThunk(
  'property/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await createProperty(propertyData);
      return response; // This will be the fulfilled action's payload
    } catch (error) {
      return rejectWithValue(error.message); // This will be the rejected action's payload
    }
  }
);
