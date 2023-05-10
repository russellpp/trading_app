import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
  pendingUsers: null,
  transactions: null,
  trader: null,
  filteredUsers: null,
  filteredTransactions: null,
  traderTransactions: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setPendingUsers: (state, action) => {
      state.pendingUsers = action.payload;
    },
    setAllTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setCurrentTrader: (state, action) => {
      state.trader = action.payload;
    },
    clearAdmin: (state) => {
      state.userList = null;
      state.pendingUsers = null;
      state.transactions = null;
      state.trader = null;
      state.filteredTransactions = null;
      state.filteredUsers = null;
      state.traderTransactions   = null;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    setFilteredTransactions: (state, action) => {
      state.filteredTransactions = action.payload;
    },
    setTraderTransactions: (state, action) => {
      state.traderTransactions = action.payload;
    },
  },
});

export const {
  setAllTransactions,
  setUserList,
  setCurrentTrader,
  setPendingUsers,
  clearAdmin,
  setFilteredTransactions,
  setFilteredUsers,
  setTraderTransactions,
} = adminSlice.actions;

export const selectUserList = (state) => state.admin.userList;
export const selectTransactionsList = (state) => state.admin.transactions;
export const selectCurrentTrader = (state) => state.admin.trader;
export const selectTraderTransactions = (state) =>
  state.admin.traderTransactions;
export const selectFilteredUsers = (state) => state.admin.filteredUsers;
export const selectFilteredTransactions = (state) =>
  state.admin.filteredTransactions;

export default adminSlice.reducer;
