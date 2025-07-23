// src/services/propertyService.js
const API_URL = import.meta.env.VITE_API_URL;

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
