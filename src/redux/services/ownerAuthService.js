import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// Owner Registration
export const registerOwnerService = async (formData) => {
  const res = await axios.post(`${API_URL}owner/register`, formData);
  return res.data;
};

// Owner Login
export const loginOwnerService = async ({ phone, password }) => {
  const res = await axios.post(`${API_URL}owner/login`, { phone, password });
  return res.data;
};

// Get Owner Profile
export const getOwnerProfileService = async ({ id, token }) => {
  const res = await axios.get(`${API_URL}owner/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
