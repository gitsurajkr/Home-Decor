import { configureStore } from "@reduxjs/toolkit";
import meDataReducer from "./userSlice";
import cartReducer from "./cartSlice";
 const store = configureStore({
  reducer: {
    meData: meDataReducer,
    cart: cartReducer
  },
});

export default store;
