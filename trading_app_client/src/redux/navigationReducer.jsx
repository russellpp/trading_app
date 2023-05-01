import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "home",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    goToHomePage: (state) => {
      state.currentPage = "home";
    },
    goToLoginPage: (state) => {
      state.currentPage = "login";
    },
    goToRegisterPage: (state) => {
      state.currentPage = "register";
    },
    goToVerifyPage: (state) => {
      state.currentPage = "verify";
    },
    goToResendVerifyPage: (state) => {
      state.currentPage = "verify_resend";
    },
    goToPasswordResetPage: (state) => {
      state.currentPage = "reset";
    },
    goToPasswordResetCodePage: (state) => {
      state.currentPage = "reset_code";
    },
  },
});

export const {
  goToHomePage,
  goToLoginPage,
  goToRegisterPage,
  goToPasswordResetPage,
  goToVerifyPage,
  goToPasswordResetCodePage,
  goToResendVerifyPage
} = navigationSlice.actions;

export const selectCurrentPage = (state) => state.navigation.currentPage;

export default navigationSlice.reducer;
