import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const joinUrl = (base, path) => {
  const b = (base || "").replace(/\/+$/, "");
  const p = (path || "").replace(/^\/+/, "");
  return `${b}/${p}`;
};

const rentPageService = {
  getNewlyAddedProperties: async () => {
    const url = joinUrl(API_URL, "property/lookingTo/rent");
    const res = await axios.get(url);
    return res.data;
  },

  getRecommendedSellers: async () => {
    const url = joinUrl(API_URL, "property");
    const res = await axios.get(url);
    return res.data;
  },

  getNewsAndArticles: async () => {
    const url = joinUrl(API_URL, "property");
    const res = await axios.get(url);
    return res.data;
  },
};

export default rentPageService;
