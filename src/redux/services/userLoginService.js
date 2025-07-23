import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/"; // fallback

// REGISTER USER
export const registerUser = async (formData) => {
  const res = await axios.post(
    `${API_URL}user/create`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data; // { message, token, user }
};

// LOGIN USER
export const loginUser = async (loginBody) => {
  const res = await axios.post(
    `${API_URL}user/login`,
    loginBody
  );
  return res.data; // { message, token, user }
};

// GET USER PROFILE
export const getUserProfile = async (id, token) => {
  const res = await axios.get(
    `${API_URL}user/profile/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { user }
};
