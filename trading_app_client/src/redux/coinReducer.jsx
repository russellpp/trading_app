import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCoins: null,
  currentCoin: null,
  chartData: null,
  marketData: null,
  exactPrice: null,
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setAllCoins: (state, action) => {
      state.allCoins = action.payload;
    },
    clearAllCoins: (state) => {
      state.allCoins = null;
    },
    clearCoins: (state) => {
      state.allCoins = null;
      state.currentCoin = null;
      state.chartData = null;
      state.marketData = null;
      state.exactPrice = null;
    },
    setCurrentCoin: (state, action) => {
      state.currentCoin = action.payload;
    },
    clearCurrentCoin: (state) => {
      state.currentCoin = null;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    clearChartData: (state) => {
      state.chartData = null;
    },
    setMarketData: (state, action) => {
      state.marketData = action.payload;
    },
    clearMarketData: (state) => {
      state.marketData = null;
    },
    setExactPrice: (state, action) => {
      state.exactPrice = action.payload;
    },
    clearExactPrice: (state) => {
      state.exactPrice = null;
    },
  },
});

export const {
  setAllCoins,
  clearCoins,
  clearAllCoins,
  setCurrentCoin,
  clearCurrentCoin,
  setChartData,
  clearChartData,
  setMarketData,
  clearMarketData,
  setExactPrice,
  clearExactPrice,
} = coinSlice.actions;

export const selectAllCoins = (state) => state.coin.allCoins;
export const selectCurrentCoin = (state) => state.coin.currentCoin;
export const selectChartData = (state) => state.coin.chartData;
export const selectMarketData = (state) => state.coin.marketData;
export const selectExactPrice = (state) => state.coin.exactPrice;

export default coinSlice.reducer;
