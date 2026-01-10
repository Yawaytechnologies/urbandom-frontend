// src/redux/actions/buyPageActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import buyPageService from "../services/buyPageService";

// dummies
import { DUMMY_PROMINENT_PROJECTS } from "../../components/dummy/prominentProjectsDummy";
import { DUMMY_NEWLY_ADDED_PROPERTIES } from "../../components/dummy/newlyAddedPropertiesDummy";

/* ---------------- Featured ---------------- */
export const fetchFeaturedProperties = createAsyncThunk(
  "buyPage/fetchFeaturedProperties",
  async (_, { rejectWithValue }) => {
    try {
      const data = await buyPageService.getFeaturedProperties();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch properties");
    }
  }
);

/* ---------------- Prominent (fallback dummy, never reject) ---------------- */
export const fetchProminentProperties = createAsyncThunk(
  "buyPage/fetchProminentProperties",
  async () => {
    try {
      const data = await buyPageService.getProminentProperties();
      return Array.isArray(data) && data.length ? data : DUMMY_PROMINENT_PROJECTS;
    } catch {
      return DUMMY_PROMINENT_PROJECTS;
    }
  }
);

/* ---------------- Developers ---------------- */
export const fetchFeaturedDevelopers = createAsyncThunk(
  "buyPage/fetchFeaturedDevelopers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await buyPageService.getFeaturedDevelopers();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch featured developers");
    }
  }
);

/* ---------------- Newly Added (fallback dummy, never reject) ---------------- */
export const fetchNewlyAddedProperties = createAsyncThunk(
  "buyPage/fetchNewlyAddedProperties",
  async () => {
    try {
      const data = await buyPageService.getNewlyAddedProperties();
      return Array.isArray(data) && data.length ? data : DUMMY_NEWLY_ADDED_PROPERTIES;
    } catch {
      return DUMMY_NEWLY_ADDED_PROPERTIES;
    }
  }
);

/* ---------------- News ---------------- */
export const fetchNewsAndArticles = createAsyncThunk(
  "buyPage/fetchNewsAndArticles",
  async (_, { rejectWithValue }) => {
    try {
      const data = await buyPageService.getNewsAndArticles();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch articles");
    }
  }
);
