import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}property`;

export const createProperty = async (propertyData) => {
  if (!propertyData.lookingTo) {
    throw new Error('Please specify the property type: rent, sell, or PG/co-living.');
  }

  try {
    const response = await axios.post(API_URL, propertyData, {
      headers: {
        'Content-Type': 'application/json', // Correct for JSON
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Error creating property');
  }
};
