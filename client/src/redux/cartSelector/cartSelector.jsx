import { createSelector } from "reselect";

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);
