import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set or remove Authorization header dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Function to register a new user
export const registerUserAPI = async (userData, profileImageFile) => {
  const formData = new FormData();

  // Append text fields
  formData.append("username", userData.name);
  formData.append("email", userData.email);
  formData.append("userPassword", userData.password);
  formData.append("phone", userData.phone);

  // Append image file if available
  if (profileImageFile) {
    formData.append("userProfile", userData.userImage); // field name must match multer setup
  }

  try {
    const response = await api.post("/user/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // override default JSON for this request
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginUserAPI = async (credentials) => {
  try {
    const response = await api.post('/user/login', credentials);
    return response.data; // This will contain { token, user, message }
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};


export default api;
