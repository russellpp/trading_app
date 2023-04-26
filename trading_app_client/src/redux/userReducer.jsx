import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = false;
    },
    adminLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
