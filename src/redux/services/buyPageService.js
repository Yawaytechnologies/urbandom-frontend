// src/services/buyPageService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const buyPageService = {
  // Fetch All Properties
  getFeaturedProperties: async () => {
    try {
      const response = await axios.get(`${API_URL}property/lookingTo/sell`);  // Get all properties (no ID needed)
      return response.data; // Return the list of properties
    } catch {
      throw new Error('Failed to fetch properties');
    }
  },

  // Fetch Prominent Properties
  getProminentProperties: async () => {
    try {
      const response = await axios.get(`${API_URL}property/lookingTo/sell`);  // Adjust API endpoint
      return response.data;  // Return the data directly from the API response
    } catch {
      throw new Error('Failed to fetch prominent properties');
    }
  },

  // Fetch Prominent Properties
  getFeaturedDevelopers: async () => {
    try {
      const response = await axios.get(`${API_URL}property/lookingTo/sell`);  // Adjust API endpoint
      return response.data;  // Return the data directly from the API response
    } catch {
      throw new Error('Failed to fetch featured developers');
    }
  },

  // Fetch Newly Added Properties
  getNewlyAddedProperties: async () => {
    try {
      const response = await axios.get(`${API_URL}property/lookingTo/sell`);  // Adjust endpoint to match your API
      return response.data;
    } catch (error) {
      throw new Error('Error fetching newly added properties: ' + error.message);
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

export default buyPageService;
