import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCoins: null,
  currentCoin: null,
  chartData: null,
  marketData: null,
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
    },
    setCurrentCoin: (state, action) => {
      state.currentCoin = action.payload;
    },
    clearCurrentCoin: (state, action) => {
      state.currentCoin = null;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    clearChartData: (state, action) => {
      state.chartData = null;
    },
    setMarketData: (state, action) => {
      state.marketData = action.payload;
    },
    clearMarketData: (state, action) => {
      state.marketData = null;
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
} = coinSlice.actions;

export const selectAllCoins = (state) => state.coin.allCoins;
export const selectCurrentCoin = (state) => state.coin.currentCoin;
export const selectChartData = (state) => state.coin.chartData;
export const selectMarketData = (state) => state.coin.marketData;

export default coinSlice.reducer;
