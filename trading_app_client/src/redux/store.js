import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import navigationReducer from "./navigationReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
  },
});
