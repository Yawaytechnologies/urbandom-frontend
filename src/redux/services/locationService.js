// src/services/locationService.js

import axios from 'axios';

// --- Axios Client Setup ---
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('❌ VITE_API_BASE_URL is not set! Check your .env file and restart your dev server.');
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// --- Country Service ---
export const getCountries = () => apiClient.get('/country');
export const getCountryById = (id) => apiClient.get(`/country/${id}`);
export const createCountry = (data) => apiClient.post('/country', data);
export const updateCountry = (id, data) => apiClient.put(`/country/${id}`, data);
export const deleteCountry = (id) => apiClient.delete(`/country/${id}`);

// --- State Service ---
export const getStates = () => apiClient.get('/state');
export const getStateById = (id) => apiClient.get(`/state/${id}`);
export const getStatesByCountry = (countryId) => apiClient.get(`/state/country/${countryId}`);
export const createState = (data) => apiClient.post('/state', data);
export const updateState = (id, data) => apiClient.put(`/state/${id}`, data);
export const deleteState = (id) => apiClient.delete(`/state/${id}`);

// --- District Service ---
export const getDistricts = () => apiClient.get('/district');
export const getDistrictById = (id) => apiClient.get(`/district/${id}`);
export const getDistrictsByState = (stateId) => apiClient.get(`/district/state/${stateId}`);
export const getDistrictsByName = (name) => apiClient.get(`/district/name/${name}`);
export const createDistrict = (data) => apiClient.post('/district', data);
export const updateDistrict = (id, data) => apiClient.put(`/district/${id}`, data);
export const deleteDistrict = (id) => apiClient.delete(`/district/${id}`);

// --- Locality Service (add endpoints as available) ---
export const getLocalitiesByDistrict = (districtId) => apiClient.get(`/locality/district/${districtId}`);
export const getLocalityById = (id) => apiClient.get(`/locality/${id}`);

// --- Location Service (for final ObjectId selection, add endpoints as available) ---
export const getLocations = (filters) => {
  // Example: filters = { district: '...', locality: '...' }
  const params = new URLSearchParams(filters).toString();
  return apiClient.get(`/location?${params}`);
};
export const getLocationById = (id) => apiClient.get(`/location/${id}`);


// Get all localities by district
export const getLocationsByDistrict = async (districtId) => {
  const { data } = await apiClient.get(`/location/district/${districtId}`);
  // Assuming response is: { locations: [ ... ] } or just [ ... ]
  return Array.isArray(data) ? data : data.locations;
};

// Create a new locality
export const createLocation = async ({ name, district }) => {
  const { data } = await apiClient.post('/location', { name, district });
  // Assuming response is: { location: {...} }
  return data.location || data;
};