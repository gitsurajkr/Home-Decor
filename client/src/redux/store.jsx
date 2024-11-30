import { configureStore } from "@reduxjs/toolkit";
import meDataReducer from "./userSlice";
 const store = configureStore({
  reducer: {
    meData: meDataReducer,
  },
});

export default store;
