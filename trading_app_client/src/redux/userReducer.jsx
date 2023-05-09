import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isAdmin: null,
  loginDetails: null,
  resendDetails: null,
  wallet: null,
  cryptos: null,
  transactions: null,
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
      state.wallet = parseFloat(action.payload.user.balance);
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isAdmin = null;
      state.loginDetails = null;
      state.resendDetails = null;
      state.wallet = null;
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
    setWallet: (state, action) => {
      state.wallet = parseFloat(action.payload);
    },
    clearWallet: (state) => {
      state.wallet = null;
    },
    setCryptos: (state, action) => {
      state.cryptos = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    clearCryptos: (state) => {
      state.cryptos = null;
    },
    clearTransactions: (state) => {
      state.transactions = null;
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
  clearWallet,
  setWallet,
  setCryptos,
  setTransactions,
  clearCryptos,
  clearTransactions,
} = userSlice.actions;

export const selectLoginDetails = (state) => state.user.loginDetails;
export const selectResendDetails = (state) => state.user.resendDetails;
export const selectUserDetails = (state) => state.user.user;
export const selectUserWallet = (state) => state.user.wallet;
export const selectUserCryptos = (state) => state.user.cryptos;
export const selectUserTransactions = (state) => state.user.transactions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
