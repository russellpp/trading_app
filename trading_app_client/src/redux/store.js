import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import navigationReducer from "./navigationReducer";
import requestReducer from "./requestReducer";
import requestStatusReducer from "./requestStatusReducer";
import coinReducer from "./coinReducer";
import tradeReducer from "./tradeReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    request: requestReducer,
    requestStatus: requestStatusReducer,
    coin: coinReducer,
    trade: tradeReducer,
  },
});
