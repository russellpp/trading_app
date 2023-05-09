import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addUser: false,
  editUser: false,
  addFunds: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddUser: (state) => {
      state.addUser = true;
    },
    clearAddUser: (state) => {
      state.addUser = false;
    },
    setEditUser: (state) => {
      state.editUser = true;
    },
    clearEditUser: (state) => {
      state.editUser = false;
    },
    setAddFunds: (state) => {
      state.addFunds = true;
    },
    clearAddFunds: (state) => {
      state.addFunds = false;
    },
  },
});

export const {
  setAddFunds,
  setAddUser,
  setEditUser,
  clearAddFunds,
  clearAddUser,
  clearEditUser,
} = modalSlice.actions;

export const selectAddUserModal = (state) => state.modal.addUser;
export const selectEditUserModal = (state) => state.modal.editUser;
export const selectAddFundsModal = (state) => state.modal.addFunds;
export const selectModalStatus = (state) => state.modal;

export default modalSlice.reducer;
