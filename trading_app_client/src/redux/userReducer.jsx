import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isAdmin: false,
  loginDetails: null,
  resendDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.is_admin || false;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.loginDetails = null;
      state.resendDetails = null;
    },
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
    clearLoginDetails: (state) => {
      state.loginDetails = null;
    },
    setResendDetails: (state, action) => {
      state.resendDetails = action.payload;
    },
    clearResendDetails: (state) => {
      state.resendDetails = null;
    },
  },
});

export const {
  userLogin,
  userLogout,
  setLoginDetails,
  clearLoginDetails,
  setResendDetails,
  clearResendDetails,
} = userSlice.actions;

export const selectLoginDetails = (state) => state.user.loginDetails;
export const selectResendDetails = (state) => state.user.resendDetails;
export const selectUserDetails = (state) => state.user.user;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
