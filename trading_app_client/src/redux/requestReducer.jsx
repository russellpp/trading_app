import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestFor: null,
  details: {},
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequestType: (state, action) => {
      state.requestFor = action.payload;
    },
    setRequestDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setRequestDetails, setRequestType } = requestSlice.actions;

export default requestSlice.reducer;
