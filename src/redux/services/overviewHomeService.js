// src/redux/services/overviewHomeService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const overviewHomeService = {
  // ✅ Fetch Overview Data (includes amenities)
  fetchOverviewHomeDataById: async (propertyId) => {
    try {
      const response = await axios.get(`${API_URL}property/${propertyId}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch overview data');
    }
  }
};

export default overviewHomeService;
