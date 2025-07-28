import { createAsyncThunk } from '@reduxjs/toolkit';
import { createProperty } from '../services/propertyService';

// Create a new property listing
export const createPropertyAsync = createAsyncThunk(
  'property/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await createProperty(propertyData);

      // --- Normalize owner to just owner._id ---
      let property = response.property || response.data?.property || response.data;
      if (property && typeof property.owner === "object" && property.owner._id) {
        property.owner = property.owner._id;
      }

      // If the structure is { property: ... }, return the full object, else fallback
      if (response.property) {
        return { ...response, property };
      } else if (response.data?.property) {
        return { ...response.data, property };
      } else {
        return property;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
