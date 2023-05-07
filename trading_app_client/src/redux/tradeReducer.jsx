import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionType: "buy",
  coin: null,
  amount: null,
  value: null,
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    switchType: (state, action) => {
      state.transactionType = action.payload;
    },
    clearTrade: (state) => {
      state.transactionType = "buy";
      state.coin = null;
      state.amount = null;
      state.value = null;
    },
    setTradeCoin: (state, action) => {
      state.coin = action.payload;
    },
    clearTradeCoin: (state) => {
      state.coin = null;
    },
    setTradeAmount: (state, action) => {
      state.amount = action.payload;
    },
    clearTradeAmount: (state) => {
      state.amount = null;
    },
    setTradeValue: (state, action) => {
      state.value = action.payload;
    },
    clearTradeValue: (state) => {
      state.value = null;
    },
  },
});

export const {
  switchType,
  clearTrade,
  setTradeCoin,
  clearTradeCoin,
  setTradeAmount,
  clearTradeAmount,
  clearTradeValue,
  setTradeValue,
} = tradeSlice.actions;

export const selectTrade = (state) => state.trade;
export const selectTradeTransactionType = (state) =>
  state.trade.transactionType;
export const selectTradeCoin = (state) => state.trade.coin;
export const selectTradeAmount = (state) => state.trade.amount;
export const selectTradeValue = (state) => state.trade.value;

export default tradeSlice.reducer;
