import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import navigationReducer from "./navigationReducer";
import requestReducer from "./requestReducer";
import requestStatusReducer from "./requestStatusReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    request: requestReducer,
    requestStatus: requestStatusReducer,
  },
});
