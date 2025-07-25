import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerOwnerService,
  loginOwnerService,
  getOwnerProfileService,
} from "../services/ownerAuthService";

// Register Owner
export const ownerRegisterThunk = createAsyncThunk(
  "owner/register",
  async (formData, { rejectWithValue }) => {
    try {
      return await registerOwnerService(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Owner registration failed");
    }
  }
);

// Login Owner
export const ownerLoginThunk = createAsyncThunk(
  "owner/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      return await loginOwnerService({ phone, password });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Owner login failed");
    }
  }
);

// Get Owner Profile
export const getOwnerProfileThunk = createAsyncThunk(
  "owner/profile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getOwnerProfileService({ id, token });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch owner profile");
    }
  }
);
