import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


const pgPageService = {
  // Fetch All Properties
  getNeighbourhoodPgs: async () => {
    try {
      const response = await axios.get(`${API_URL}property/lookingTo/pg-co-living`);  // Get all properties (no ID needed)
      return response.data; // Return the list of properties
    } catch {
      throw new Error('Failed to fetch properties');
    }
  },
};

export default pgPageService;
