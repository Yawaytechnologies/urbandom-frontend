import axios from 'axios';

// Access the VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Fetch property data by ID
export const fetchOverviewHomeDataById = async (propertyId) => {
  try {
    const response = await axios.get(`${API_URL}/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch property data');
  }
};
