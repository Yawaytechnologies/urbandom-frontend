import { createAsyncThunk } from '@reduxjs/toolkit';
import rentPageService from '../services/rentPageService' // Make sure you import the rentPageService


// Fetch newly added properties for Rent page
export const fetchNewlyAddedProperties = createAsyncThunk(
  'rentPage/fetchNewlyAddedProperties',
  async (_, { rejectWithValue }) => {
    try {
      const newlyAddedProperties = await rentPageService.getNewlyAddedProperties(); // Call the method from rentPageService
      return newlyAddedProperties.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch recommended sellers for Rent page
export const fetchRecommendedSellersAction = createAsyncThunk(
  'rentPage/fetchRecommendedSellers',
  async (_, { rejectWithValue }) => {
    try {
      const sellers = await rentPageService.getRecommendedSellers(); // Call the method from rentPageService
      return sellers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch News and Articles section
export const fetchNewsAndArticlesAction = createAsyncThunk(
  'rentPage/fetchNewsAndArticles',
  async (_, { rejectWithValue }) => {
    try {
      const articles = await rentPageService.getNewsAndArticles(); // Call the method from newsAndArticleService
      return articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
  );

  
