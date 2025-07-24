// src/redux/services/rentPageService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const rentPageService = {
  // Fetch Newly Added Properties
  getNewlyAddedProperties: async () => {
    try {
      const response = await axios.get(`${API_URL}property/lookingTo/rent`);  // Adjust endpoint to match your API
      return response.data;
    } catch (error) {
      throw new Error('Error fetching newly added properties: ' + error.message);
    }
  },

  // Fetch Recommended Sellers
  getRecommendedSellers: async () => {
    try {
      const response = await axios.get(`${API_URL}property`);  // Adjust endpoint to match your API
      return response.data;
    } catch (error) {
      throw new Error('Error fetching recommended sellers: ' + error.message);
    }
  },

  // Fetch News and Articles
  getNewsAndArticles: async () => {
    try {
      const response = await axios.get(`${API_URL}property`);  // Correct the endpoint for articles
      return response.data;  // Return the list of articles
    } catch (error) {
      throw new Error('Error fetching articles: ' + error.message);
    }
  },
};

export default rentPageService;
