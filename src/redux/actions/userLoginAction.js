import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUserProfile } from "../services/userLoginService";

// Register (Signup)
export const signupThunk = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await registerUser(formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Registration failed"
      );
    }
  }
);

// Login
export const loginThunk = createAsyncThunk(
  "user/login",
  async (loginBody, { rejectWithValue }) => {
    try {
      const data = await loginUser(loginBody);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Login failed"
      );
    }
  }
);

// Get User Profile
export const getUserProfileThunk = createAsyncThunk(
  "user/getUserProfile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const data = await getUserProfile(id, token);
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Profile fetch failed"
      );
    }
  }
);
