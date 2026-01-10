// src/redux/buyPageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFeaturedProperties,
  fetchFeaturedDevelopers,
  fetchProminentProperties,
  fetchNewsAndArticles,
  fetchNewlyAddedProperties,
} from "../actions/buyPageActions";

const initialState = {
  // data
  featuredProperties: [],
  prominentProperties: [],
  featuredDevelopers: [],
  newlyAddedProperties: [],
  newsAndArticles: [],

  // loading per section
  loading: {
    featured: false,
    prominent: false,
    developers: false,
    newlyAdded: false,
    news: false,
  },

  // error per section
  error: {
    featured: null,
    prominent: null,
    developers: null,
    newlyAdded: null,
    news: null,
  },

  // flags (useful for UI)
  uiFlags: {
    useDummyFeatured: false,
    useDummyProminent: false,
    useDummyDevelopers: false,
    useDummyNewlyAdded: false,
    useDummyNews: false,
  },
};

const buyPageSlice = createSlice({
  name: "buyPage",
  initialState,
  reducers: {
    // optional: clear a specific error manually
    clearBuyError: (state, action) => {
      const key = action.payload; // "featured" | "prominent" | ...
      if (state.error[key] !== undefined) state.error[key] = null;
    },
  },
  extraReducers: (builder) => {
    /* ---------------- Featured Properties ---------------- */
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading.featured = true;
        state.error.featured = null;
        state.uiFlags.useDummyFeatured = false;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading.featured = false;
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.featuredProperties = list;
        state.uiFlags.useDummyFeatured = list.length === 0;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading.featured = false;
        state.error.featured = action.payload || action.error?.message || "Network Error";
        state.uiFlags.useDummyFeatured = true;
      });

    /* ---------------- Prominent Properties ---------------- */
    builder
      .addCase(fetchProminentProperties.pending, (state) => {
        state.loading.prominent = true;
        state.error.prominent = null;
        state.uiFlags.useDummyProminent = false;
      })
      .addCase(fetchProminentProperties.fulfilled, (state, action) => {
        state.loading.prominent = false;
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.prominentProperties = list;
        state.uiFlags.useDummyProminent = list.length === 0;
      })
      .addCase(fetchProminentProperties.rejected, (state, action) => {
        state.loading.prominent = false;
        state.error.prominent = action.payload || action.error?.message || "Network Error";
        state.uiFlags.useDummyProminent = true;
      });

    /* ---------------- Featured Developers ---------------- */
    builder
      .addCase(fetchFeaturedDevelopers.pending, (state) => {
        state.loading.developers = true;
        state.error.developers = null;
        state.uiFlags.useDummyDevelopers = false;
      })
      .addCase(fetchFeaturedDevelopers.fulfilled, (state, action) => {
        state.loading.developers = false;
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.featuredDevelopers = list;
        state.uiFlags.useDummyDevelopers = list.length === 0;
      })
      .addCase(fetchFeaturedDevelopers.rejected, (state, action) => {
        state.loading.developers = false;
        state.error.developers = action.payload || action.error?.message || "Network Error";
        state.uiFlags.useDummyDevelopers = true;
      });

    /* ---------------- Newly Added Properties ---------------- */
    builder
      .addCase(fetchNewlyAddedProperties.pending, (state) => {
        state.loading.newlyAdded = true;
        state.error.newlyAdded = null;
        state.uiFlags.useDummyNewlyAdded = false;
      })
      .addCase(fetchNewlyAddedProperties.fulfilled, (state, action) => {
        state.loading.newlyAdded = false;
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.newlyAddedProperties = list;
        state.uiFlags.useDummyNewlyAdded = list.length === 0;
      })
      .addCase(fetchNewlyAddedProperties.rejected, (state, action) => {
        state.loading.newlyAdded = false;
        state.error.newlyAdded = action.payload || action.error?.message || "Network Error";
        state.uiFlags.useDummyNewlyAdded = true;
      });

    /* ---------------- News & Articles ---------------- */
    builder
      .addCase(fetchNewsAndArticles.pending, (state) => {
        state.loading.news = true;
        state.error.news = null;
        state.uiFlags.useDummyNews = false;
      })
      .addCase(fetchNewsAndArticles.fulfilled, (state, action) => {
        state.loading.news = false;
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.newsAndArticles = list;
        state.uiFlags.useDummyNews = list.length === 0;
      })
      .addCase(fetchNewsAndArticles.rejected, (state, action) => {
        state.loading.news = false;
        state.error.news = action.payload || action.error?.message || "Network Error";
        state.uiFlags.useDummyNews = true;
      });
  },
});

export const { clearBuyError } = buyPageSlice.actions;
export default buyPageSlice.reducer;
