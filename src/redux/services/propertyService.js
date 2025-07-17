import axios from 'axios';

// Use environment variable for the base URL and append '/property' for property creation
const API_URL = `${import.meta.env.VITE_API_URL}/property`;  // Add '/property' to the base URL

// Function to create a property listing
export const createProperty = async (propertyData) => {
  const formData = new FormData();

  // Ensure lookingTo field is included in the propertyData (can be added if not present)
  if (!propertyData.lookingTo) {
    throw new Error('Please specify the property type: rent, sell, or PG/co-living.');
  }

  // Append each field to formData
  for (const [key, value] of Object.entries(propertyData)) {
    if (key === 'images' || key === 'videos') {
      for (const file of value) {
        formData.append(key, file);
      }
    } else {
      formData.append(key, value);
    }
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure proper content type for file uploads
      },
    });
    return response.data;  // Return the data from the response
  } catch (error) {
    // Improved error handling
    throw new Error(error.response?.data?.message || error.message || 'Error creating property');
  }
};
