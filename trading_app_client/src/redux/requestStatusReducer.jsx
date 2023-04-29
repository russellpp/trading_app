import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const requestStatusSlice = createSlice({
  name: "requestStatus",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSuccess: (state) => {
      state.success = true;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearAll: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  setLoading,
  clearLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  clearAll,
} = requestStatusSlice.actions;

export const selectError = (state) => state.requestStatus.error;
export const selectLoading = (state) => state.requestStatus.loading;
export const selectSuccess = (state) => state.requestStatus.success;

export default requestStatusSlice.reducer;
