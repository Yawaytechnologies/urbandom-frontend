import { createSlice } from "@reduxjs/toolkit";
import {
  ownerLoginThunk,
  ownerRegisterThunk,
  getOwnerProfileThunk,
} from "../actions/ownerAuthAction";

const initialState = {
  owner: null,
  token: null,
  status: "idle",
  error: null,
};

const ownerAuthSlice = createSlice({
  name: "ownerAuth",
  initialState,
  reducers: {
    logoutOwner: (state) => {
      state.owner = null;
      state.token = null;
      localStorage.removeItem("ownerToken");
      localStorage.removeItem("ownerId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ownerLoginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ownerLoginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.owner = action.payload.owner;
        state.token = action.payload.token;
        localStorage.setItem("ownerToken", action.payload.token);
        localStorage.setItem("ownerId", action.payload.owner.id);
      })
      .addCase(ownerLoginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(ownerRegisterThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ownerRegisterThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.owner = action.payload.owner;
        state.token = action.payload.token;
        localStorage.setItem("ownerToken", action.payload.token);
        localStorage.setItem("ownerId", action.payload.owner.id);
      })
      .addCase(ownerRegisterThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getOwnerProfileThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOwnerProfileThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.owner = action.payload.owner;
      })
      .addCase(getOwnerProfileThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutOwner } = ownerAuthSlice.actions;
export default ownerAuthSlice.reducer;
