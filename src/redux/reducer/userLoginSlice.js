  import { createSlice } from "@reduxjs/toolkit";
  import { signupThunk, loginThunk, getUserProfileThunk,  } from "../actions/userLoginAction";

  

  // Persisted values (optional)
  const token = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");

  const initialState = {
    user: null,
    token: token || null,
    status: "idle",
    error: null,
  };

  const userLoginSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {
      logout(state) {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(signupThunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(signupThunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("userId", action.payload.user.id);
        })
        .addCase(signupThunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Signup failed";
        })
        .addCase(loginThunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("userId", action.payload.user.id);
        })
        .addCase(loginThunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Login failed";
        })
        .addCase(getUserProfileThunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(getUserProfileThunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        })
        .addCase(getUserProfileThunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch profile";
        });
    },
  });

  export const { logout } = userLoginSlice.actions;
  export default userLoginSlice.reducer;
