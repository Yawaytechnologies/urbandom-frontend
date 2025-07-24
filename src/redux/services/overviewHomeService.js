// src/redux/services/overviewHomeService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const overviewHomeService = {
  fetchOverviewHomeDataById: async (propertyId) => {
    try {
      const res = await axios.get(`${API_URL}property/${propertyId}`);
      const property = res?.data?.data;

      if (!property) {
        throw new Error("Property not found in response");
      }

      return property;
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  },
};

export default overviewHomeService;
