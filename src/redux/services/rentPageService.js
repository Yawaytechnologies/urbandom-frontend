// src/redux/services/buyPageService.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNewlyAddedProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}property`);  // Update with the actual endpoint
    return response.data;
  } catch (error) {
    throw new Error('Error fetching newly added properties: ' + error.message);
  }
};
