import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}property`;

/**
 * Create a new property.
 * @param {Object} propertyData - The property details.
 * @returns {Promise<Object>} - The created property data.
 */
export const createProperty = async (propertyData) => {
  if (!propertyData.lookingTo) {
    throw new Error('Please specify the property type: rent, sell, or PG/co-living.');
  }

  try {
    const response = await axios.post(API_URL, propertyData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Error creating property'
    );
  }
};

/**
 * Uploads files (images, videos, documents) for a given property.
 * @param {string} propertyId - The property ID.
 * @param {FileList|File[]} files - The files to upload.
 * @returns {Promise<Object>} - Response data from the server.
 */
export const uploadPropertyFiles = async (propertyId, files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    const response = await axios.post(
      `${API_URL}/${propertyId}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Error uploading files'
    );
  }
};
