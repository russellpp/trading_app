import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  success_message: null,
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
    setSuccess: (state, action) => {
      state.success = true;
      state.success_message = action.payload;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.success_message = null;
    },
    clearAll: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.success_message = null;
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
export const selectStatus = (state) => state.requestStatus;

export default requestStatusSlice.reducer;
