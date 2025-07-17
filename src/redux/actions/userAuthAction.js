import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserAPI,
  loginUserAPI,
  setAuthToken
} from '../services/userAuthServices';

// REGISTER USER
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData);
      return response.data; // Success payload
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(credentials);
      const token = response?.data?.token;

      if (token) {
        setAuthToken(token); // Save token to header or storage
      }

      return response.data; // Success payload (user + token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);
