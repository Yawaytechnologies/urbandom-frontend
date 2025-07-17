// src/services/buyPageService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const buyPageService = {
  // Fetch All Properties
  getAllProperties: async () => {
    try {
      const response = await axios.get(`${API_URL}property`);  // Get all properties (no ID needed)
      return response.data; // Return the list of properties
    } catch {
      throw new Error('Failed to fetch properties');
    }
  },

  // Fetch Prominent Properties
  getProminentProperties: async () => {
    try {
      const response = await axios.get(`${API_URL}property`);  // Adjust API endpoint
      return response.data;  // Return the data directly from the API response
    } catch {
      throw new Error('Failed to fetch prominent properties');
    }
  },
};

export default buyPageService;
