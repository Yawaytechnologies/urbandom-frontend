// src/services/propertyService.js
const API_URL = 'http://localhost:5001/api/';

const propertyService = {
  getPropertyTypes: async () => {
    const response = await fetch(`${API_URL}property`);
    if (!response.ok) {
      throw new Error('Failed to fetch property types');
    }
    return response.json();
  },
};

export default propertyService;
